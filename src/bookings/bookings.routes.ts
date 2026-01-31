import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import { createBookingSchema, updateBookingSchema } from "./bookings.validations.js";
import { createBooking, getBookings, updateBooking } from "./bookings.controllers.js";

const router = Router()

router.post('/', validate(createBookingSchema), createBooking)
router.get('/:userEmail', getBookings)
router.patch('/:id', validate(updateBookingSchema), updateBooking)


export const bookingsRoutes = router