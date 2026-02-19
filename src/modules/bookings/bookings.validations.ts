import { z } from "zod"

export const createBookingSchema = z.object({
    tran_id: z.string().min(1)
})