import { ObjectId } from "mongodb";
import { client } from "../../config/db.js";
import { carsCollection } from "../cars/cars.services.js";
import SSLCommerzPayment from "sslcommerz-lts";
import { InitPaymentInput, Payment } from "./sslcommerz.types.js";

export const paymentsCollection = client.db('web-project-28-DB').collection<Payment>('payments');

const sslcommerz = new SSLCommerzPayment(
    process.env.STORE_ID!,
    process.env.STORE_PASSWORD!,
    false // change to true in production
);


export const paymentsService = {
    async init(payload: InitPaymentInput) {

        const carInfo = await carsCollection.findOne({ _id: new ObjectId(payload.carId) })

        if (!carInfo) {
            throw new Error("Car not found");
        }

        const start = new Date(payload.startDate);
        const end = new Date(payload.endDate);
        const diffTime = end.getTime() - start.getTime();
        const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const totalAmount = (days * carInfo.dailyRentalPrice).toFixed(2);

        const tran_id = new ObjectId().toString();

        const payment = {
            tran_id,
            carId: payload.carId,
            total_amount: totalAmount,
            currency: "BDT",
            product_category: 'automobile',
            product_name: payload.product_name,
            product_profile: 'physical-goods',
            cus_name: payload.cus_name,
            cus_email: payload.cus_email,
            cus_add1: payload.cus_add1,
            cus_city: payload.cus_city,
            cus_postcode: payload.cus_postcode,
            cus_country: payload.cus_country,
            cus_phone: payload.cus_phone,
            paymentStatus: "pending",
            createdAt: new Date(),

            paymentMethod: "sslcommerz",
            startDate: payload.startDate,
            endDate: payload.endDate
        };

        await paymentsCollection.insertOne(payment as Payment);


        const sslPayload = {
            ...payment,
            success_url: `${process.env.SERVER_URL}/sslcommerz/success`, // POST handled here
            fail_url: `${process.env.SERVER_URL}/sslcommerz/failure`,    // POST handled here
            cancel_url: `${process.env.SERVER_URL}/sslcommerz/cancel`,   // POST handled here
            ipn_url: `${process.env.SERVER_URL}/sslcommerz/ipn`,         // optional for IPN
            shipping_method: "NO",
        };

        const response = await sslcommerz.init(sslPayload);

        if (!response?.GatewayPageURL) {
            throw new Error("Failed to initialize SSLCommerz session");
        }

        return { gatewayURL: response.GatewayPageURL };
    },

    // 🔹 Handle Success
    async success(tran_id: string, val_id: string) {
        const payment = await paymentsCollection.findOne({ tran_id });

        if (!payment) {
            throw new Error("Payment not found");
        }

        if (payment.paymentStatus === "complete") {
            return true;
        }


        const filter = { tran_id }
        const updateDoc = {
            $set: { val_id }
        }
        return await paymentsCollection.updateOne(filter, updateDoc);
    },

    // 🔹 Handle Failure / Cancel
    async failOrCancel(tran_id: string) {
        const filter = { tran_id }
        const updateDoc = {
            $set: {
                paymentStatus: "failed",
                updatedAt: new Date(),
            },
        }
        return await paymentsCollection.updateOne(filter, updateDoc as any);
    },

    // 🔹 Validate Payment
    async validate(tran_id: string, val_id: string) {
        const payment = await paymentsCollection.findOne({ tran_id });

        if (!payment) {
            throw new Error("Payment not found");
        }
        if (payment.val_id !== val_id) {
            return false;
        }

        const filter = { tran_id }
        const updateDoc = {
            $set: {
                paymentStatus: "complete",
                updatedAt: new Date(),
            },
        }
        return await paymentsCollection.updateOne(filter, updateDoc as any);
    },

    // 🔹 Get By Transaction ID
    async transactionId(tran_id: string) {
        return await paymentsCollection.findOne({ tran_id });
    }
}