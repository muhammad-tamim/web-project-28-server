import z from "zod"
import { createCarSchema } from "./cars.validation.js"

export type CreateCarInput = z.infer<typeof createCarSchema>