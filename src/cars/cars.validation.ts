import { z } from 'zod'

export const createCarSchema = z.object({
    name: z.string().min(2, 'Car name must be at least 2 characters'),

    description: z.string().min(10, 'Description must be at least 10 characters'),

    dailyRentalPrice: z.coerce.number().positive('Daily rental price must be greater than 0'),

    availability: z.boolean(),

    registrationNumber: z.string().min(3, 'Registration number must be at last 3 characters'),

    features: z.array(z.string().min(1)).min(1, 'At least one feature is required'),

    imageUrl: z.string().url('Invalid image URL'),

    location: z.string().min(2, 'Location is required'),

    ownerEmail: z.string().email('Invalid email address'),

    bookingCount: z.number().int().nonnegative().optional(),
    bookingStatus: z.boolean().optional(),
    createdAt: z.date().optional(),
})

export const updateCarSchema = createCarSchema.optional()
