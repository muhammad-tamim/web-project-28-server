import { ObjectId } from "mongodb";
import { client } from "../../config/db.js";
import { CreateCategoryInput, UpdateCategoryInput } from "./categories.types.js";

export const categoriesCollection = client.db('web-project-28-DB').collection<CreateCategoryInput>('types')

export const categoriesService = {

    async create(category: CreateCategoryInput) {
        const exists = await categoriesCollection.findOne({ name: { $regex: `^${category.name}$`, $options: 'i' } })

        if (exists) {
            throw new Error("Types already exists")
        }

        const fullInput = { ...category, carCount: 0, createdAt: new Date() }
        return categoriesCollection.insertOne(fullInput)
    },

    findAll() {
        return categoriesCollection.find().toArray()
    },

    update(id: string, data: UpdateCategoryInput) {
        return categoriesCollection.updateOne({ _id: new ObjectId(id) }, { $set: data as any })
    },

    delete(id: string) {
        return categoriesCollection.deleteOne({ _id: new ObjectId(id) })
    }
}