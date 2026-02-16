import { ObjectId } from "mongodb";
import { client } from "../../config/db.js";
import { CreateUserInput, UpdateUserInput } from "./users.types.js";

export const usersCollection = client.db('web-project-28-DB').collection<CreateUserInput>('users')

export const usersService = {
    async create(user: CreateUserInput) {

        const filter = { email: user.email }

        const existUser = await usersCollection.findOne(filter)

        if (existUser) {
            const updateDoc = {
                $set: { lastLogin: new Date() }
            }
            await usersCollection.updateOne(filter, updateDoc)

            return existUser
        }

        const fullInput = { ...user, createdAt: new Date(), lastLogin: new Date() }
        return usersCollection.insertOne(fullInput)
    },

    findAll(page = 1, limit = 9) {
        const skip = (page - 1) * limit
        return usersCollection.find().sort({ createdAt: -1 }).skip(skip).limit(limit).toArray()
    },

    countAll() {
        return usersCollection.countDocuments()
    },

    findOneByEmail(email: string) {
        return usersCollection.findOne({ email })
    },

    update(id: string, data: UpdateUserInput) {
        return usersCollection.updateOne({ _id: new ObjectId(id) }, { $set: data as any })
    }
}

// alternative better option: 
/*
      async create(user: CreateUserInput) {
    
        const result = await usersCollection.findOneAndUpdate(
            { email: user.email },
            {
                $setOnInsert: {
                    ...user,
                    createdAt: new Date(),
                },
                $set: {
                    lastLogin: new Date(),
                }
            },
            {
                upsert: true,
                returnDocument: 'after'
            }
        )
 
        return result
        }
    }
    */
