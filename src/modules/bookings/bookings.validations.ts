import { z } from "zod"

export const createBookingSchema = z.object({
    carId: z.string(),
    email: z.email(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
})

export const updateBookingSchema = createBookingSchema.omit({
    carId: true,
    email: true
}).partial()