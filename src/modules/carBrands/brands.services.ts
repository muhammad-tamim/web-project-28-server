import { ObjectId } from "mongodb";
import { client } from "../../config/db.js";
import { CreateBrandInput, UpdateBrandInput } from "./brands.types.js";

export const brandsCollection = client.db('web-project-28-DB').collection<CreateBrandInput>('brands')

export const brandsService = {

    async create(brand: CreateBrandInput) {

        const exists = await brandsCollection.findOne({ name: { $regex: `^{brand.name}$`, $options: 'i' } })
        if (exists) {
            throw new Error("Brand already exists")
        }

        const fullInput = { ...brand, carCount: 0, createdAt: new Date(), }
        return brandsCollection.insertOne(fullInput)
    },

    findAll() {
        return brandsCollection.find().toArray()
    },

    update(id: string, data: UpdateBrandInput) {
        return brandsCollection.updateOne({ _id: new ObjectId(id) }, { $set: data as any })
    },

    delete(id: string) {
        return brandsCollection.deleteOne({ _id: new ObjectId(id) })
    }
}