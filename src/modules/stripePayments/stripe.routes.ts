import { Router } from "express";
import { validate } from "../../middlewares/validate.js";
import { initPaymentSchema, validatePaymentSchema } from "./stripe.validation.js";
import { handlePaymentCancel, handlePaymentSuccess, initializePayment, validatePayment } from "./stripe.controller.js";

const router = Router();

// Create Stripe session (POST)
router.post("/init", validate(initPaymentSchema), initializePayment);

// Stripe success callback (POST)
router.post("/success", handlePaymentSuccess);

// Stripe cancel/failure callback (POST)
router.post("/cancel", handlePaymentCancel);

// Validate payment (POST)
router.post("/validate", validate(validatePaymentSchema), validatePayment);

export const stripeRoutes = router;
