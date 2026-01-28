import { Request, Response, NextFunction } from 'express'
import admin from '../cars/cars.firebase.js'

export interface AuthRequest extends Request {
    decoded?: admin.auth.DecodedIdToken
}

export const verifyToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Not authenticated' })
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = await admin.auth().verifyIdToken(token as string)
        req.decoded = decoded
        next()
    } catch {
        return res.status(401).json({ message: 'Token expired or invalid' })
    }
}
