import { Router } from "express";
import { validate } from "../../middlewares/validate.js";
import { createBrandSchema, updateBrandSchema } from "./brands.validations.js";
import { countAllBrand, createBrand, deleteBrand, getBrands, updateBrand } from "./brands.controllers.js";

const router = Router()

router.post('/', validate(createBrandSchema), createBrand)
router.get('/', getBrands)
router.get('/count', countAllBrand)
router.patch('/:id', validate(updateBrandSchema), updateBrand)
router.delete('/:id', deleteBrand)

export const brandsRoutes = router