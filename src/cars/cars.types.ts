import z from "zod"
import { createCarSchema } from "./cars.validation.js"

export type CarType = z.infer<typeof createCarSchema>