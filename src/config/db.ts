import { MongoClient, ServerApiVersion } from 'mongodb'
import dotenv from 'dotenv'
import { env } from './env.js'

dotenv.config()

export const client = new MongoClient(env.MONGODB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        // strict: true,
        deprecationErrors: true
    }
})

export async function connectDB() {
    await client.connect()
    await client.db('admin').command({ ping: 1 })
    console.log('MongoDB connected')
}