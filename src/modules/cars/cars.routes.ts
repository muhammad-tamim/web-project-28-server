import { Router } from "express";
import { createCar, deleteCar, getCar, getCars, getCarsByBrand, getCarsByCategory, getCarsByEmail, getCountAllCars, getRecentCars, getSearch, updateCar } from "./cars.controllers.js";
import { validate } from "../../middlewares/validate.js";
import { createCarSchema, updateCarSchema } from "./cars.validation.js";
import { verifyToken } from "../../middlewares/verifyToken.js";

const router = Router()

router.post('/', verifyToken, validate(createCarSchema), createCar)
router.get('/', getCars)

router.get('/count', getCountAllCars)

router.get('/recent', getRecentCars)
router.get('/search', getSearch)
router.get('/brands/:brand', getCarsByBrand)
router.get('/categories/:category', getCarsByCategory)
router.get('/owner/:email', verifyToken, getCarsByEmail)

router.get('/:id', getCar)
router.patch('/:id', verifyToken, validate(updateCarSchema), updateCar)
router.delete('/:id', verifyToken, deleteCar)
export const carsRoutes = router