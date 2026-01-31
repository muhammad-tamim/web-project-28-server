import { z } from 'zod'

export const createCarSchema = z.object({
    name: z.string().min(2),
    description: z.string().min(10),
    dailyRentalPrice: z.coerce.number().positive(),
    availability: z.boolean(),
    registrationNumber: z.string().min(3),
    features: z.array(z.string().min(1)).min(1),
    imageUrl: z.url(),
    location: z.string().min(2),
    ownerEmail: z.email(),
    bookingCount: z.number().int().nonnegative().optional(),
    bookingStatus: z.boolean().optional(),
    createdAt: z.date().optional(),
})

export const updateCarSchema = createCarSchema.omit({
    bookingCount: true,
    createdAt: true,
}).partial();
