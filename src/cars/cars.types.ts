import z from "zod"
import { createCarSchema, updateCarSchema } from "./cars.validation.js"

export type CreateCarInput = z.infer<typeof createCarSchema>
export type UpdateCarInput = z.infer<typeof updateCarSchema>