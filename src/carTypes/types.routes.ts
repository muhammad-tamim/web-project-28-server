import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import { createTypeSchema, updateTypeSchema } from "./types.validation.js";
import { createType, getTypes, updateType } from "./types.controllers.js";

const router = Router()

router.post('/', validate(createTypeSchema), createType)
router.get('/', getTypes)
router.patch('/:id', validate(updateTypeSchema), updateType)

export const typesRoutes = router