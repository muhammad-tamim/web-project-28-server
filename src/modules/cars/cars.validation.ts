import { z } from 'zod'


export const createCarSchema = z.object({
    name: z.string().min(2),
    model: z.string().min(2),
    year: z.number().int(),
    brand: z.string(),
    category: z.string(),
    description: z.string().min(5),
    dailyRentalPrice: z.coerce.number().positive(),
    registrationNumber: z.string().min(3),
    features: z.string().min(1),
    photoUrl: z.url(),
    email: z.email(),
})

export const updateCarSchema = createCarSchema.omit({ email: true }).partial()