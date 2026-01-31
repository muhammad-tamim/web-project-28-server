import { Request, Response } from "express"
import { bookingsService } from "./bookings.services.js"

export const createBooking = async (req: Request, res: Response) => {
    try {
        const result = await bookingsService.create(req.body)
        res.status(201).send({
            success: true,
            message: "Booking created successfully",
            result
        })
    }
    catch (err: any) {
        res.status(500).send({ message: err.message })
    }
}