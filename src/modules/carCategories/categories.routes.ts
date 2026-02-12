import { Router } from "express";
import { validate } from "../../middlewares/validate.js";
import { createCategorySchema, updateCategorySchema } from "./categories.validations.js";
import { createCategory, getCategories, updateCategory } from "./categories.controllers.js";

const router = Router()

router.post('/', validate(createCategorySchema), createCategory)
router.get('/', getCategories)
router.patch('/:id', validate(updateCategorySchema), updateCategory)

export const categoriesRoutes = router