import { client } from "../config/db.js";
import { CreateCarInput } from "./cars.types.js";

const carsCollection = client.db('web-project-28-DB').collection<CreateCarInput>('cars')

export const carsService = {
    create(car: CreateCarInput) {
        const fullInput = { ...car, bookingCount: 0, bookingStatus: false, createdAt: new Date() }
        return carsCollection.insertOne(fullInput)
    }
}