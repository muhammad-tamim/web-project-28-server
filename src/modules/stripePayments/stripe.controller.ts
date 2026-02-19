import { Request, Response } from "express";
import { stripeService } from "./stripe.service.js";
import { InitPaymentInput } from "./stripe.types.js";

// 🔹 Initialize Payment & Create Stripe Session
export const initializePayment = async (req: Request, res: Response) => {
    try {
        const payload: InitPaymentInput = req.body;
        const result = await stripeService.init(payload);

        res.status(200).json({
            success: true,
            message: "Stripe session created",
            gatewayURL: result.gatewayURL,
            tran_id: result.tran_id,
            val_id: result.val_id,
        });
    } catch (err: any) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// 🔹 Handle Stripe Success Callback
export const handlePaymentSuccess = async (req: Request, res: Response) => {
    try {
        const { tran_id, val_id } = req.body;
        await stripeService.success(tran_id, val_id);

        res.redirect(
            `${process.env.CLIENT_URL}/payment-success?tran_id=${tran_id}&val_id=${val_id}&provider=stripe`
        );
    } catch (err: any) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// 🔹 Handle Stripe Cancel / Failure Callback
export const handlePaymentCancel = async (req: Request, res: Response) => {
    try {
        const { tran_id } = req.body;
        await stripeService.failOrCancel(tran_id);

        res.redirect(
            `${process.env.CLIENT_URL}/payment-cancel?tran_id=${tran_id}&provider=stripe`
        );
    } catch (err: any) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// 🔹 Validate Stripe Payment (used by frontend)
export const validatePayment = async (req: Request, res: Response) => {
    try {
        const { tran_id, val_id } = req.body;
        const success = await stripeService.validate(tran_id, val_id);

        res.status(200).json({ success });
    } catch (err: any) {
        res.status(500).json({ success: false, message: err.message });
    }
};
