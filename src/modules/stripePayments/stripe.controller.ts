import { Request, Response } from "express";
import { stripeService } from "./stripe.service.js";
import { bookingsService } from "../bookings/bookings.services.js";
import { StripeMetadata } from "./stripe.types.js";

export const createStripeSession = async (req: Request, res: Response) => {
    try {
        const url = await stripeService.createSession(req.body);
        res.status(200).send({ url });
    } catch (err: any) {
        res.status(500).send({ message: err.message });
    }
};

export const verifyStripePayment = async (req: Request, res: Response) => {
    try {
        const { sessionId } = req.params;

        const session = await stripeService.verify(sessionId as string);

        const metadata = session.metadata as StripeMetadata;

        // Check metadata before booking
        if (!metadata.carId || !metadata.email || !metadata.startDate || !metadata.endDate) {
            return res.status(200).send({
                success: true,
                message: "Payment completed, but booking metadata is missing.",
                paymentStatus: session.payment_status
            });
        }

        try {
            const payment = {
                sessionId: session.id,
                paymentIntentId: session.payment_intent as string,
                amount: (session.amount_total ?? 0) / 100,
                currency: session.currency ?? "usd",
                status: session.payment_status,
                paidAt: new Date(),
            };

            const result = await bookingsService.create(
                {
                    carId: metadata.carId,
                    email: metadata.email,
                    startDate: new Date(metadata.startDate),
                    endDate: new Date(metadata.endDate),
                },
                payment
            );

            res.status(200).send({
                success: true,
                message: "Payment verified & booking created",
                result,
            });
        } catch (bookingErr: any) {
            res.status(200).send({
                success: true,
                message: "Payment verified, but booking could not be created: " + bookingErr.message
            });
        }

    } catch (err: any) {
        res.status(500).send({ message: err.message });
    }
};
