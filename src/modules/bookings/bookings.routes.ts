import { Router } from "express";
import { createBookingSchema, updateBookingSchema } from "./bookings.validations.js";
import { createBooking, deleteBooking, getBookings, updateBooking } from "./bookings.controllers.js";
import { validate } from "../../middlewares/validate.js";

const router = Router()

router.post('/', validate(createBookingSchema), createBooking)
router.get('/:email', getBookings)
router.patch('/:id', validate(updateBookingSchema), updateBooking)
router.delete('/:id', deleteBooking)

export const bookingsRoutes = router