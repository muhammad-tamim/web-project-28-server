import z from "zod";

export const createBrandSchema = z.object({
    name: z.string().min(2),
    photoUrl: z.url(),
    isActive: z.boolean().optional().default(true),
})

export const updateBrandSchema = createBrandSchema.omit({ name: true }).partial()