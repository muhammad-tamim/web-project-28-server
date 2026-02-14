// bookings.controllers.ts
import { Request, Response } from "express"
import { bookingsService } from "./bookings.services.js"

export const getBookings = async (req: Request, res: Response) => {
    try {
        const result = await bookingsService.findAll(req.params.email as string)
        res.status(200).send({
            success: true,
            message: "Bookings retrieved successfully",
            result
        })
    }
    catch (err: any) {
        res.status(500).send({ message: err.message })
    }
}

export const updateBooking = async (req: Request, res: Response) => {
    try {
        const result = await bookingsService.update(req.params.id as string, req.body)
        res.status(200).send({
            success: true,
            message: "Booking updated successfully",
            result
        })
    }
    catch (err: any) {
        res.status(500).send({ message: err.message })
    }
}

export const deleteBooking = async (req: Request, res: Response) => {
    try {
        const result = await bookingsService.delete(req.params.id as string)
        res.status(200).send({
            success: true,
            message: "Booking deleted successfully",
            result
        })
    }
    catch (err: any) {
        res.status(500).send({ message: err.message })
    }
}