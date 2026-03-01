import { Router } from "express";
import { validate } from "../../middlewares/validate.js";
import { createCategorySchema, updateCategorySchema } from "./categories.validations.js";
import { countAllCategory, createCategory, deleteCategory, getCategories, updateCategory } from "./categories.controllers.js";
import { verifyToken } from "../../middlewares/verifyToken.js";
import { verifyAdmin } from "../../middlewares/verifyAdmin.js";

const router = Router()

router.post('/', verifyToken, verifyAdmin, validate(createCategorySchema), createCategory)
router.get('/', verifyToken, getCategories)

router.get('/count', verifyToken, countAllCategory)

router.patch('/:id', verifyToken, verifyAdmin, validate(updateCategorySchema), updateCategory)
router.delete('/:id', verifyToken, verifyAdmin, deleteCategory)

export const categoriesRoutes = router