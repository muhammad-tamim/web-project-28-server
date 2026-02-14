// bookings.routes.ts
import { Router } from "express";
import { createBookingSchema, updateBookingSchema } from "./bookings.validations.js";
import { deleteBooking, getBookings, updateBooking } from "./bookings.controllers.js";
import { validate } from "../../middlewares/validate.js";

const router = Router()

router.get('/:email', getBookings)
router.patch('/:id', validate(updateBookingSchema), updateBooking)
router.delete('/:id', deleteBooking)

export const bookingsRoutes = router