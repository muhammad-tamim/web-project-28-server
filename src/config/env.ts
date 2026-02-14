import 'dotenv/config'

export const env = {
    PORT: process.env.PORT || 3000,
    MONGODB_URI: process.env.MONGODB_URI as string,
    FB_SERVICE_KEY: process.env.FB_SERVICE_KEY as string,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    CLIENT_URL: process.env.CLIENT_URL
}

if (!env.MONGODB_URI) {
    throw new Error('MONGODB_URI is missing in .env')
}