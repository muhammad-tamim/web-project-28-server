import { ObjectId } from "mongodb";
import { client } from "../config/db.js";
import { CreateCarInput, UpdateCarInput } from "./cars.types.js";

const carsCollection = client.db('web-project-28-DB').collection<CreateCarInput>('cars')

export const carsService = {
    create(car: CreateCarInput) {
        const fullInput = { ...car, bookingCount: 0, bookingStatus: false, createdAt: new Date() }
        return carsCollection.insertOne(fullInput)
    },

    findAll() {
        return carsCollection.find().toArray()
    },

    findOne(id: string) {
        return carsCollection.findOne({ _id: new ObjectId(id) })
    },

    update(id: string, data: UpdateCarInput) {
        return carsCollection.updateOne({ _id: new ObjectId(id) }, { $set: data as any })
    },

    delete(id: string) {
        return carsCollection.deleteOne({ _id: new ObjectId(id) })
    }
}