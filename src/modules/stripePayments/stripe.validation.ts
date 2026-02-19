// stripe.validation.ts
import { z } from "zod";

export const initPaymentSchema = z.object({
    carId: z.string().min(1),

    product_name: z.string().min(2),

    cus_name: z.string().min(2),
    cus_email: z.email(),
    cus_add1: z.string().min(3),
    cus_city: z.string().min(2),
    cus_postcode: z.string().min(3),
    cus_country: z.string().min(2),
    cus_phone: z.string().min(6),

    startDate: z.string(),
    endDate: z.string()
});

export const validatePaymentSchema = z.object({
    tran_id: z.string().min(1),
    val_id: z.string().min(1),
});
