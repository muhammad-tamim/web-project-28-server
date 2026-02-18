// bookings.routes.ts
import { Router } from "express";
import { createBookingSchema, updateBookingSchema } from "./bookings.validations.js";
import { deleteBooking, getAllBookings, getBookings, getBookingsBySellerEmail, updateBooking } from "./bookings.controllers.js";
import { validate } from "../../middlewares/validate.js";

const router = Router()

router.get('/:email', getBookings)
router.get('/', getAllBookings)

router.get('/seller/:email', getBookingsBySellerEmail)
router.get('/seller/pagination/:email', getBookingsBySellerEmail)

router.patch('/:id', validate(updateBookingSchema), updateBooking)
router.delete('/:id', deleteBooking)

export const bookingsRoutes = router