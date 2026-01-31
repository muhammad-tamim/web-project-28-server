import { Response, NextFunction } from 'express'
import { AuthRequest } from './verifyToken.js'

export const authorizeEmail = (req: AuthRequest, res: Response, next: NextFunction) => {
    const emailFromToken = req.decoded?.email

    const emailFromRequest = req.params.email || req.query.email || req.body.email

    if (!emailFromToken || emailFromToken !== emailFromRequest) {
        return res.status(403).json({ message: 'Forbidden access' })
    }

    next()
}
