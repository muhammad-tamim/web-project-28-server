import { Router } from "express";
import { createBrand, getBrands, updateBrand } from "./brands.controllers.js";
import { createBrandSchema, updateBrandSchema } from "./brands.validations.js";
import { validate } from "../middlewares/validate.js";

const router = Router()

router.post('/', validate(createBrandSchema), createBrand)
router.get('/', getBrands)
router.patch('/:id', validate(updateBrandSchema), updateBrand)

export const brandsRoutes = router