import 'dotenv/config'

export const env = {
    PORT: process.env.PORT || 3000,
    MONGODB_URI: process.env.MONGODB_URI as string
}

if (!env.MONGODB_URI) {
    throw new Error('MONGODB_URI is missing in .env')
}