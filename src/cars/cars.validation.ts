import { z } from 'zod'

export const createCarSchema = z.object({
    name: z.string().min(2),
    brand: z.string().min(2).transform((val) => val.toLowerCase()),
    model: z.string().min(2),
    year: z.number().int().min(2000).max(new Date().getFullYear()),
    description: z.string().min(10),
    dailyRentalPrice: z.coerce.number().positive(),
    availability: z.boolean(),
    registrationNumber: z.string().min(3),
    features: z.array(z.string().min(1)).min(1),
    imageUrl: z.url(),
    location: z.string().min(2),
    ownerEmail: z.email(),
})

export const updateCarSchema = createCarSchema.omit({ ownerEmail: true }).partial()