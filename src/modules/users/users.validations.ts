import z from "zod";

export const createUserSchema = z.object({
    name: z.string().min(2),
    email: z.email(),
    photoUrl: z.url(),
    role: z.string().min(2).optional().default('customer'),
    wantToSellerRequest: z.boolean().optional().default(false),
})

export const updateUserSchema = createUserSchema.omit({ name: true, email: true, photoUrl: true }).partial()
