import { Response, NextFunction } from 'express'
import { AuthRequest } from './verifyToken.js'

export const authorizeEmail = (req: AuthRequest, res: Response, next: NextFunction) => {
    const emailFromToken = req.decoded?.email
    const emailFromParams = req.params.email

    if (!emailFromToken || emailFromToken !== emailFromParams) {
        return res.status(403).json({ message: 'Forbidden access' })
    }

    next()
}
