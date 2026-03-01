// bookings.routes.ts
import { Router } from "express";
import { createBookingSchema } from "./bookings.validations.js";
import { createBooking, deleteBooking, getAllBookings, getAllBookingsWithPagination, getBookings, getBookingsBySellerEmail, getReport } from "./bookings.controllers.js";
import { validate } from "../../middlewares/validate.js";
import { verifyToken } from "../../middlewares/verifyToken.js";

const router = Router()

router.post('/', validate(createBookingSchema), createBooking)
router.get('/pagination', getAllBookingsWithPagination)
router.get('/report', getReport)
router.get('/seller/pagination/:email', getBookingsBySellerEmail)
router.get('/seller/:email', getBookingsBySellerEmail)
router.get('/', getAllBookings)

router.get('/:email', getBookings)

router.delete('/:id', deleteBooking)

export const bookingsRoutes = router