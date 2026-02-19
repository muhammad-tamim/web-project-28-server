import Stripe from "stripe";
import { env } from "../../config/env.js";

export const stripe = new Stripe(env.STRIPE_SECRET_KEY as string);

export const stripeService = {

    async createSession(data: {
        carId: string;
        email: string;
        startDate: string;
        endDate: string;
        totalCost: number;
    }) {

        console.log('Stripe payload:', data);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: "Car Booking",
                        },
                        unit_amount: data.totalCost * 100,
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                carId: data.carId,
                email: data.email,
                startDate: new Date(data.startDate).toISOString(),
                endDate: new Date(data.endDate).toISOString(),
            },
            success_url: `${env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${env.CLIENT_URL}/`,
        });

        return session.url;
    },

    async verify(sessionId: string) {
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status !== "paid") {
            throw new Error("Payment not completed");
        }

        return session;
    }
};
