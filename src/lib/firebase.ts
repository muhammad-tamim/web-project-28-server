import admin from 'firebase-admin'
import { env } from '../config/env.js'

const decoded = Buffer.from(env.FB_SERVICE_KEY, 'base64').toString('utf-8')
const serviceAccount = JSON.parse(decoded)

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    })
}

export default admin
