import { Router } from "express";
import { createCar, deleteCar, getCar, getCars, getCarsByBrand, getCarsByCategory, getCarsByEmail, getCountAllCars, getPremiumCars, getRecentCars, getSearch, updateCar } from "./cars.controllers.js";
import { validate } from "../../middlewares/validate.js";
import { createCarSchema, updateCarSchema } from "./cars.validation.js";
import { verifyToken } from "../../middlewares/verifyToken.js";
import { verifySeller } from "../../middlewares/verifySeller.js";

const router = Router()

router.post('/', verifyToken, verifySeller, validate(createCarSchema), createCar)
router.get('/', getCars)

router.get('/count', getCountAllCars)

router.get('/recent', getRecentCars)
router.get('/premium', getPremiumCars)
router.get('/search', getSearch)
router.get('/brands/:brand', getCarsByBrand)
router.get('/categories/:category', getCarsByCategory)
router.get('/owner/:email', verifyToken, verifySeller, getCarsByEmail)

router.get('/:id', getCar)
router.patch('/:id', verifyToken, verifySeller, validate(updateCarSchema), updateCar)
router.delete('/:id', verifyToken, verifySeller, deleteCar)
export const carsRoutes = router