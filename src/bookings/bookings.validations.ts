import { z } from "zod"

export const createBookingSchema = z.object({
    carId: z.string(),
    userEmail: z.email(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
})
