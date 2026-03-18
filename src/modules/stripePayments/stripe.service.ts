// src/modules/stripe/stripe.service.ts

import Stripe from "stripe";
import { ObjectId } from "mongodb";
import { client } from "../../config/db.js";
import { InitPaymentInput, Payment } from "./stripe.types.js";
import { env } from "../../config/env.js";
import { carsCollection } from "../cars/cars.services.js";
import { bookingsService } from "../bookings/bookings.services.js";

const paymentsCollection = client
    .db("web-project-28-DB")
    .collection<Payment>("payments");

const stripe = new Stripe(env.STRIPE_SECRET_KEY as string);

export const stripeService = {
    async init(payload: InitPaymentInput) {
        const carInfo = await carsCollection.findOne({
            _id: new ObjectId(payload.carId),
        });

        if (!carInfo) throw new Error("Car not found");

        const start = new Date(payload.startDate);
        const end = new Date(payload.endDate);
        const diffTime = end.getTime() - start.getTime();
        const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (days <= 0) throw new Error("Invalid booking dates");

        const totalAmount = (days * carInfo.dailyRentalPrice).toFixed(2);
        const tran_id = new ObjectId().toString();

        const payment: Payment = {
            tran_id,
            carId: payload.carId,
            total_amount: totalAmount,
            currency: "USD",

            product_category: "automobile",
            product_name: payload.product_name,
            product_profile: "physical-goods",

            cus_name: payload.cus_name,
            cus_email: payload.cus_email,
            cus_add1: payload.cus_add1,
            cus_city: payload.cus_city,
            cus_postcode: payload.cus_postcode,
            cus_country: payload.cus_country,
            cus_phone: payload.cus_phone,

            paymentStatus: "pending",
            createdAt: new Date(),

            paymentMethod: "stripe",
            startDate: payload.startDate,
            endDate: payload.endDate,
        };

        await paymentsCollection.insertOne(payment);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: { name: payload.product_name },
                        unit_amount: Math.round(parseFloat(totalAmount) * 100),
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                tran_id,
            },
            success_url: `${process.env.CLIENT_URL}/payment-success?tran_id=${tran_id}&val_id={CHECKOUT_SESSION_ID}&provider=stripe`,
            cancel_url: `${process.env.CLIENT_URL}/payment-cancel?tran_id=${tran_id}&provider=stripe`,
        });

        await paymentsCollection.updateOne(
            { tran_id },
            { $set: { val_id: session.id } }
        );

        return {
            gatewayURL: session.url,
            tran_id,
            val_id: session.id,
        };
    },

    // 🔥 SINGLE SOURCE OF TRUTH (VALIDATE + CREATE BOOKING)
    async validateAndCreateBooking(tran_id: string, val_id: string) {
        const payment = await paymentsCollection.findOne({ tran_id });

        if (!payment) throw new Error("Payment not found");

        // ✅ Prevent duplicate booking (CRITICAL)
        if (payment.paymentStatus === "complete") {
            return true;
        }

        if (payment.val_id !== val_id) return false;

        // 🔥 VERIFY WITH STRIPE
        const session = await stripe.checkout.sessions.retrieve(val_id);

        if (session.payment_status !== "paid") {
            return false;
        }

        // ✅ mark payment complete
        await paymentsCollection.updateOne(
            { tran_id },
            {
                $set: {
                    paymentStatus: "complete",
                    updatedAt: new Date(),
                },
            }
        );

        // 🔥 create booking (same as SSLCommerz)
        await bookingsService.create(tran_id);

        return true;
    },

    async failOrCancel(tran_id: string) {
        return await paymentsCollection.updateOne(
            { tran_id },
            {
                $set: {
                    paymentStatus: "failed",
                    updatedAt: new Date(),
                },
            }
        );
    },

    async transactionId(tran_id: string) {
        return await paymentsCollection.findOne({ tran_id });
    },
};