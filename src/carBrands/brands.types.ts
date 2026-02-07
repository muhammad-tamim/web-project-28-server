import z from "zod"
import { createBrandSchema, updateBrandSchema } from "./brands.validations.js"

export type CreateBrandInput = z.infer<typeof createBrandSchema>
export type UpdateBrandInput = z.infer<typeof updateBrandSchema>