// bookings.types.ts
import z from "zod"
import { createBookingSchema } from "./bookings.validations.js"

export type CreateBookingInput = z.infer<typeof createBookingSchema>
