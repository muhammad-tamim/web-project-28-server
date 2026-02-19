// payments.controllers.ts
import { Request, Response } from "express";
import { paymentsService } from "./payments.services.js";

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

        await paymentsService.success(tran_id, val_id);

        res.redirect(`${process.env.CLIENT_URL}/payment-success?tran_id=${tran_id}&val_id=${val_id}`)
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
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
