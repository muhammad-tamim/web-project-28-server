import { Router } from "express";
import { createCar, getCar, getCars, updateCar } from "./cars.controllers.js";
import { validate } from "../middlewares/validate.js";
import { createCarSchema, updateCarSchema } from "./cars.validation.js";

const router = Router()

router.post('/', validate(createCarSchema), createCar)
router.get('/', getCars)
router.get('/:id', getCar)
router.patch('/:id', validate(updateCarSchema), updateCar)

export const carsRoutes = router