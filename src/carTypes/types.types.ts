import z from "zod";
import { createTypeSchema, updateTypeSchema } from "./types.validation.js";

export type CreateTypeInput = z.infer<typeof createTypeSchema>
export type UpdateTypeInput = z.infer<typeof updateTypeSchema>