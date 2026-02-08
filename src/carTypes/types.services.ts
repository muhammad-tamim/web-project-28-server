import { ObjectId } from "mongodb";
import { client } from "../config/db.js";
import { CreateTypeInput, UpdateTypeInput } from "./types.types.js";

export const typesCollection = client.db('web-project-28-DB').collection<CreateTypeInput>('types')

export const typesService = {

    async create(type: CreateTypeInput) {
        const exists = await typesCollection.findOne({ name: { $regex: `^${type.name}$`, $options: 'i' } })

        if (exists) {
            throw new Error("Types already exists")
        }

        const fullInput = { ...type, createdAt: new Date() }
        return typesCollection.insertOne(fullInput)
    },

    findAll() {
        return typesCollection.find().toArray()
    },

    update(id: string, data: UpdateTypeInput) {
        return typesCollection.updateOne({ _id: new ObjectId(id) }, { $set: data as any })
    }
}