// bookings.validations.ts
import { z } from "zod"

export const createBookingSchema = z.object({
    tran_id: z.string().min(1),
    carId: z.string().min(1),
    cus_name: z.string().min(1),
    cus_email: z.string().email(),
    cus_photoUrl: z.string().optional(),
    total_amount: z.number().min(0),
    currency: z.string().min(1),
    startDate: z.string().min(1),
    endDate: z.string().min(1),
    createdAt: z.date().optional(),
})