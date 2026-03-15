// bookings.routes.ts
import { Router } from "express";
import { createBookingSchema } from "./bookings.validations.js";
import { createBooking, deleteBooking, getAllBookings, getAllBookingsWithPagination, getBookings, getBookingsBySellerEmail, getReport } from "./bookings.controllers.js";
import { validate } from "../../middlewares/validate.js";
import { verifyToken } from "../../middlewares/verifyToken.js";
import { authorizeEmail } from "../../middlewares/authorizeEmail.js";

const router = Router()

router.post('/', validate(createBookingSchema), createBooking)
router.get('/pagination', verifyToken, getAllBookingsWithPagination)
router.get('/report', verifyToken, getReport)
router.get('/seller/pagination/:email', verifyToken, authorizeEmail, getBookingsBySellerEmail)
router.get('/seller/:email', verifyToken, authorizeEmail, getBookingsBySellerEmail)
router.get('/', verifyToken, getAllBookings)

router.get('/:email', verifyToken, authorizeEmail, getBookings)

router.delete('/:id', verifyToken, deleteBooking)

export const bookingsRoutes = router