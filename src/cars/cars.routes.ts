import { Router } from "express";
import { createCar, getCars } from "./cars.controllers.js";
import { validate } from "../middlewares/validate.js";
import { createCarSchema } from "./cars.validation.js";

const router = Router()

router.post('/', validate(createCarSchema), createCar)
router.get('/', getCars)

export const carsRoutes = router