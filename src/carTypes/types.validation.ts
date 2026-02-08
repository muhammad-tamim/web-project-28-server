import z from "zod";

export const createTypeSchema = z.object({
    name: z.string().min(2),
    photoUrl: z.url(),
    isActive: z.boolean().optional().default(true)
})

export const updateTypeSchema = createTypeSchema.omit({ name: true }).partial()