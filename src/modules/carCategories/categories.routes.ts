import { Router } from "express";
import { validate } from "../../middlewares/validate.js";
import { createCategorySchema, updateCategorySchema } from "./categories.validations.js";
import { countAllCategory, createCategory, deleteCategory, getCategories, updateCategory } from "./categories.controllers.js";
import { verifyToken } from "../../middlewares/verifyToken.js";

const router = Router()

router.post('/', verifyToken, validate(createCategorySchema), createCategory)
router.get('/', verifyToken, getCategories)

router.get('/count', verifyToken, countAllCategory)

router.patch('/:id', verifyToken, validate(updateCategorySchema), updateCategory)
router.delete('/:id', verifyToken, deleteCategory)

export const categoriesRoutes = router