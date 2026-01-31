import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import { createBookingSchema } from "./bookings.validations.js";
import { createBooking } from "./bookings.controllers.js";

const router = Router()

router.post('/', validate(createBookingSchema), createBooking)

export const bookingsRoutes = router