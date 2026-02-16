import z from "zod";
import { createUserSchema, updateUserSchema } from "./users.validations.js";

export type CreateUserInput = z.infer<typeof createUserSchema>
export type UpdateUserInput = z.infer<typeof updateUserSchema>