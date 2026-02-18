// bookings.routes.ts
import { Router } from "express";
import { createBookingSchema, updateBookingSchema } from "./bookings.validations.js";
import { deleteBooking, getAllBookings, getAllBookingsWithPagination, getBookings, getBookingsBySellerEmail, getReport, updateBooking } from "./bookings.controllers.js";
import { validate } from "../../middlewares/validate.js";

const router = Router()

router.get('/pagination', getAllBookingsWithPagination)
router.get('/report', getReport)
router.get('/seller/pagination/:email', getBookingsBySellerEmail)
router.get('/seller/:email', getBookingsBySellerEmail)
router.get('/', getAllBookings)

router.get('/:email', getBookings)

router.patch('/:id', validate(updateBookingSchema), updateBooking)
router.delete('/:id', deleteBooking)

export const bookingsRoutes = router