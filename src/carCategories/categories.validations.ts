import z from "zod";

export const createCategorySchema = z.object({
    name: z.string().min(2),
    photoUrl: z.url(),
    isActive: z.boolean().optional().default(true)
})

export const updateCategorySchema = createCategorySchema.omit({ name: true }).partial()