import z from "zod";
import { createCategorySchema, updateCategorySchema } from "./categories.validations.js";

export type CreateCategoryInput = z.infer<typeof createCategorySchema>
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>