import { Router } from "express";
import { validate } from "../../middlewares/validate.js";
import { createBrandSchema, updateBrandSchema } from "./brands.validations.js";
import { countAllBrand, createBrand, deleteBrand, getBrands, updateBrand } from "./brands.controllers.js";
import { verifyToken } from "../../middlewares/verifyToken.js";

const router = Router()

router.post('/', verifyToken, validate(createBrandSchema), createBrand)
router.get('/', verifyToken, getBrands)
router.get('/count', verifyToken, countAllBrand)
router.patch('/:id', verifyToken, validate(updateBrandSchema), updateBrand)
router.delete('/:id', verifyToken, deleteBrand)

export const brandsRoutes = router