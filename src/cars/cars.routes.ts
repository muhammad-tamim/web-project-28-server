import { Router } from "express";
import { createCar } from "./cars.controllers.js";
import { validate } from "../middlewares/validate.js";
import { createCarSchema } from "./cars.validation.js";

const router = Router()

router.post('/', validate(createCarSchema), createCar)

export const carsRoutes = router