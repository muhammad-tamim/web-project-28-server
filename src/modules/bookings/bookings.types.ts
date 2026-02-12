import z from "zod"
import { createBookingSchema, updateBookingSchema } from "./bookings.validations.js"

export type CreateBookingInput = z.infer<typeof createBookingSchema>
export type UpdateBookingInput = z.infer<typeof updateBookingSchema>