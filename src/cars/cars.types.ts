import z from "zod"
import { createCarSchema, updateCarSchema } from "./cars.validation.js"
import { ObjectId } from "mongodb"

export type CreateCarInput = z.infer<typeof createCarSchema>
export type UpdateCarInput = z.infer<typeof updateCarSchema>

export interface Car extends CreateCarInput {
    _id: ObjectId
    bookingCount: number
    bookingStatus: boolean
    availability: boolean
    createdAt: Date
}