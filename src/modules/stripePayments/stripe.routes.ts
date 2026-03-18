// src/modules/stripe/stripe.route.ts

import { Router } from "express";
import { validate } from "../../middlewares/validate.js";
import {
    initializePayment,
    validatePayment,
    handlePaymentCancel,
} from "./stripe.controller.js";
import {
    initPaymentSchema,
    validatePaymentSchema,
} from "./stripe.validation.js";

const router = Router();

router.post("/init", validate(initPaymentSchema), initializePayment);

// 🔥 frontend will call this after redirect
router.post("/validate", validate(validatePaymentSchema), validatePayment);

router.post("/cancel", handlePaymentCancel);

export const stripeRoutes = router;