import { ObjectId, OptionalId } from "mongodb";
import { client } from "../../config/db.js";
import { Car, CreateCarInput, UpdateCarInput } from "./cars.types.js";

export const carsCollection = client.db('web-project-28-DB').collection<OptionalId<Car>>('cars');

export const carsService = {
    create(car: CreateCarInput) {
        const fullInput = { ...car, bookingCount: 0, bookingStatus: false, availability: true, createdAt: new Date() }
        return carsCollection.insertOne(fullInput)
    },

    findAll(page = 1, limit = 9) {
        const skip = (page - 1) * limit
        return carsCollection.find().sort({ createdAt: -1 }).skip(skip).limit(limit).toArray()
    },

    findAllByBrand(brand: string, page = 1, limit = 9) {
        const skip = (page - 1) * limit
        return carsCollection.find({ brand: new RegExp(`^${brand}$`, 'i') }).sort({ createdAt: -1 }).skip(skip).limit(limit).toArray()
    },

    findAllByCategory(category: string, page = 1, limit = 9) {
        const skip = (page - 1) * limit
        return carsCollection.find({ category: new RegExp(`^${category}$`, 'i') }).sort({ createdAt: -1 }).skip(skip).limit(limit).toArray()
    },

    countAll() {
        return carsCollection.countDocuments()
    },

    countByBrand(brand: string) {
        return carsCollection.countDocuments({ brand: new RegExp(`^${brand}$`, 'i') })
    },

    countByCategory(category: string) {
        return carsCollection.countDocuments({ category: new RegExp(`^${category}$`, 'i') })
    },

    findRecent() {
        return carsCollection.find().sort({ createdAt: -1 }).limit(9).toArray()
    },

    findOne(id: string) {
        return carsCollection.findOne({ _id: new ObjectId(id) })
    },

    update(id: string, data: UpdateCarInput) {
        return carsCollection.updateOne({ _id: new ObjectId(id) }, { $set: data as any })
    },

    delete(id: string) {
        return carsCollection.deleteOne({ _id: new ObjectId(id) })
    },

    findAllByEmail(email: string, page = 1, limit = 9) {
        const skip = (page - 1) * limit
        return carsCollection.find({ email }).sort({ createdAt: -1 }).skip(skip).limit(limit).toArray()
    },

    findSearch(brand: string, category: string, sort: 'asc' | 'desc', page: number, limit: number) {

        const filter: any = {}

        if (brand && brand !== 'Any Brand') {
            filter.brand = { $regex: `^${brand}$`, $options: 'i' }
        }
        if (category && category !== 'Any Category') {
            filter.category = { $regex: `^${category}$`, $options: 'i' }
        }

        const sortOption: any = { createdAt: -1 }

        if (sort === 'asc') {
            sortOption.dailyRentalPrice = 1
        }
        if (sort === 'desc') {
            sortOption.dailyRentalPrice = -1
        }

        const skip = (page - 1) * limit

        return carsCollection.find(filter).sort(sortOption).skip(skip).limit(limit).toArray()
    },

    countBrandCategory(brand: string, category: string) {
        const filter: any = {}

        if (brand && brand !== 'Any Brand') {
            filter.brand = brand
        }

        if (category && category !== 'Any Category') {
            filter.category = category
        }

        return carsCollection.countDocuments(filter)
    }

}