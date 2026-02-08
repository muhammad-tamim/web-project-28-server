import { z } from 'zod'


export const createCarSchema = z.object({
    name: z.string().min(2),
    model: z.string().min(2),
    year: z.number().int().min(2000).max(new Date().getFullYear()),
    brand: z.string(),
    category: z.string(),
    description: z.string().min(10),
    dailyRentalPrice: z.coerce.number().positive(),
    availability: z.boolean().optional().default(true),
    registrationNumber: z.string().min(3),
    features: z.array(z.string().min(1)).min(1),
    imageUrl: z.url(),
    email: z.email(),
})

export const updateCarSchema = createCarSchema.omit({ email: true }).partial()