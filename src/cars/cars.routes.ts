import { Router } from "express";
import { createCar, deleteCar, getCar, getCars, getCarsByBrand, getCarsByCategory, getCarsByEmail, getRecentCars, getSearch, updateCar } from "./cars.controllers.js";
import { validate } from "../middlewares/validate.js";
import { createCarSchema, updateCarSchema } from "./cars.validation.js";

const router = Router()

router.post('/', validate(createCarSchema), createCar)
router.get('/', getCars)

router.get('/recent', getRecentCars)
router.get('/search', getSearch)
router.get('/brands/:brand', getCarsByBrand)
router.get('/categories/:category', getCarsByCategory)
router.get('/owner/:email', getCarsByEmail)

router.get('/:id', getCar)
router.patch('/:id', validate(updateCarSchema), updateCar)
router.delete('/:id', deleteCar)
export const carsRoutes = router