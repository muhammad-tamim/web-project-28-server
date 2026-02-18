import { Router } from "express";
import { validate } from "../../middlewares/validate.js";
import { createCategorySchema, updateCategorySchema } from "./categories.validations.js";
import { countAllCategory, createCategory, deleteCategory, getCategories, updateCategory } from "./categories.controllers.js";

const router = Router()

router.post('/', validate(createCategorySchema), createCategory)
router.get('/', getCategories)

router.get('/count', countAllCategory)

router.patch('/:id', validate(updateCategorySchema), updateCategory)
router.delete('/:id', deleteCategory)

export const categoriesRoutes = router