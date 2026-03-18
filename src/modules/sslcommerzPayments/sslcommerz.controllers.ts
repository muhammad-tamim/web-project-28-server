import { Request, Response } from "express";
import { paymentsService } from "./sslcommerz.services.js";
import { bookingsService } from "../bookings/bookings.services.js";

export const initializePayment = async (req: Request, res: Response) => {
    try {
        const result = await paymentsService.init(req.body);
        res.status(200).json(result);
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

export const handlePaymentSuccess = async (req: Request, res: Response) => {
    try {
        const { tran_id, val_id } = req.body;

        // 1️⃣ mark payment success
        await paymentsService.success(tran_id, val_id);

        // 2️⃣ validate payment
        const isValid = await paymentsService.validate(tran_id, val_id);

        if (!isValid) {
            throw new Error("Payment validation failed");
        }

        // 3️⃣ create booking (🔥 MOVE HERE)
        await bookingsService.create(tran_id);

        // 4️⃣ redirect to frontend
        res.redirect(
            `${process.env.CLIENT_URL}/payment-success?tran_id=${tran_id}`
        );

    } catch (err: any) {
        res.redirect(`${process.env.CLIENT_URL}/payment-cancel`);
    }
};

export const handlePaymentFailureORCancel = async (req: Request, res: Response) => {
    try {
        await paymentsService.failOrCancel(req.body.tran_id);

        res.redirect(`${process.env.CLIENT_URL}/payment-cancel?tran_id=${req.body.tran_id}`)
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

export const validatePayment = async (req: Request, res: Response) => {
    try {
        const success = await paymentsService.validate(
            req.body.tran_id,
            req.body.val_id
        );

        res.status(200).json({ success });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
