import { Router } from "express";
import { createStripeSession, verifyStripePayment } from "./stripe.controller.js";

const router = Router();

router.post("/create-session", createStripeSession);
router.get("/verify/:sessionId", verifyStripePayment);

export const stripeRoutes = router;
