// sslcommerzPayments/payments.routes.ts

import { Router } from "express";
import { handlePaymentFailureORCancel, handlePaymentSuccess, initializePayment, validatePayment } from "./payments.controllers.js";
import { validate } from "../../middlewares/validate.js";
import { initPaymentSchema, validatePaymentSchema } from "./payments.validations.js";

const router = Router()

router.post("/init", validate(initPaymentSchema), initializePayment);
router.post("/success", handlePaymentSuccess);
router.post("/failure", handlePaymentFailureORCancel);
router.post("/validate", validate(validatePaymentSchema), validatePayment);


export const sslcommerzRoutes = router;
