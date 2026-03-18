import { Request, Response } from "express";
import { stripeService } from "./stripe.service.js";
import { InitPaymentInput } from "./stripe.types.js";
import { bookingsService } from "../bookings/bookings.services.js";

// 🔹 Initialize Payment & Create Stripe Session

export const initializePayment = async (req: Request, res: Response) => {
    try {
        const result = await stripeService.init(req.body);

        res.status(200).json({
            success: true,
            gatewayURL: result.gatewayURL,
            tran_id: result.tran_id,
            val_id: result.val_id,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// 🔥 THIS replaces webhook
export const validatePayment = async (req: Request, res: Response) => {
    try {
        const { tran_id, val_id } = req.body;

        const success = await stripeService.validateAndCreateBooking(
            tran_id,
            val_id
        );

        res.status(200).json({ success });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

export const handlePaymentCancel = async (req: Request, res: Response) => {
    try {
        const { tran_id } = req.body;

        await stripeService.failOrCancel(tran_id);

        res.redirect(
            `${process.env.CLIENT_URL}/payment-cancel?tran_id=${tran_id}`
        );
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};