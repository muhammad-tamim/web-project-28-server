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

export const getAllBookings = async (req: Request, res: Response) => {
    try {
        const result = await bookingsService.findAllBookings()
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


export const getBookingsBySellerEmail = async (req: Request, res: Response) => {
    try {
        const result = await bookingsService.findAllBySellerEmail(req.params.email as string)
        res.status(200).send({
            success: true,
            message: "Seller booking info retrieved successfully",
            result
        })
    }
    catch (err: any) {
        res.status(500).send({ message: err.message })
    }
}

export const getBookingsBySellerEmailWithPagination = async (req: Request, res: Response) => {
    const email = req.params.email
    const page = Number(req.query.page)
    const limit = Number(req.query.limit)
    try {
        const bookings = await bookingsService.findAllBySellerEmailWithPagination(email as string, page, limit)
        const total = await bookingsService.countAllBySellerEmail(email as string)

        res.status(200).send({
            success: true,
            message: "Seller booking info retrieved successfully",
            result: bookings,
            meta: {
                total,
                page,
                totalPage: Math.ceil(total / limit)
            }
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