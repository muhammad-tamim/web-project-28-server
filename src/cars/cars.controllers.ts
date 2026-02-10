import { Request, Response } from "express";
import { carsService } from "./cars.services.js";

export const createCar = async (req: Request, res: Response) => {
    try {
        const result = await carsService.create(req.body)
        res.status(201).send({
            success: true,
            message: "Car created successfully",
            result
        })
    }
    catch (err: any) {
        res.status(500).send({ message: err.message })
    }
}

export const getCars = async (req: Request, res: Response) => {
    const page = Number(req.query.page)
    const limit = Number(req.query.limit)
    try {
        const cars = await carsService.findAll(page, limit)
        const total = await carsService.countAll()
        res.status(200).send({
            success: true,
            message: "Cars retrieved successfully",
            result: cars,
            meta: {
                total,
                page,
                totalPages: Math.ceil(total / limit)
            }
        })
    }
    catch (err: any) {
        res.status(500).send({ message: err.message })
    }
}

export const getCarsByBrand = async (req: Request, res: Response) => {
    const brand = req.params.brand
    const page = Number(req.query.page)
    const limit = Number(req.query.limit)
    try {
        const cars = await carsService.findAllByBrand(brand as string, page, limit)
        const total = await carsService.countByBrand(brand as string)
        res.status(200).send({
            success: true,
            message: "Cars retrieved successfully",
            result: cars,
            meta: {
                total,
                page,
                totalPages: Math.ceil(total / limit)
            }
        })
    }
    catch (err: any) {
        res.status(500).send({ message: err.message })
    }
}

export const getCarsByCategory = async (req: Request, res: Response) => {
    const category = req.params.category
    const page = Number(req.query.page)
    const limit = Number(req.query.limit)
    try {
        const cars = await carsService.findAllByCategory(category as string, page, limit)
        const total = await carsService.countByCategory(category as string)
        res.status(200).send({
            success: true,
            message: "Cars retrieved successfully",
            result: cars,
            meta: {
                total,
                page,
                totalPages: Math.ceil(total / limit)
            }
        })
    }
    catch (err: any) {
        res.status(500).send({ message: err.message })
    }
}


export const getRecentCars = async (req: Request, res: Response) => {
    try {
        const result = await carsService.findRecent()
        res.status(200).send({
            success: true,
            message: "Cars retrieved successfully",
            result
        })
    }
    catch (err: any) {
        res.status(500).send({ message: err.message })
    }
}


export const getCar = async (req: Request, res: Response) => {
    try {
        const result = await carsService.findOne(req.params.id as string)
        res.status(200).send({
            success: true,
            message: "Car retrieved successfully",
            result
        })
    }
    catch (err: any) {
        res.status(500).send({ message: err.message })
    }
}

export const updateCar = async (req: Request, res: Response) => {
    try {
        const result = await carsService.update(req.params.id as string, req.body)
        res.status(200).send({
            success: true,
            message: "Car update successfully",
            result
        })
    }
    catch (err: any) {
        res.status(500).send({ message: err.message })
    }
}

export const deleteCar = async (req: Request, res: Response) => {
    try {
        const result = await carsService.delete(req.params.id as string)
        res.status(200).send({
            success: true,
            message: "Car delete successfully",
            result
        })
    }
    catch (err: any) {
        res.status(500).send({ message: err.message })
    }
}

export const getCarsByEmail = async (req: Request, res: Response) => {
    const page = Number(req.query.page)
    const limit = Number(req.query.limit)
    try {
        const cars = await carsService.findAllByEmail(req.params.email as string, page, limit)
        const total = await carsService.countAll()
        res.status(200).send({
            success: true,
            message: "Cars retrieved successfully",
            result: cars,
            meta: {
                total,
                page,
                totalPages: Math.ceil(total / limit)
            }
        })
    }
    catch (err: any) {
        res.status(500).send({ message: err.message })
    }
}

export const getSearch = async (req: Request, res: Response) => {
    try {
        const { brand, sort } = req.query
        const result = await carsService.findSearch(brand as string, sort as 'asc' | 'desc')
        res.status(200).send({
            success: true,
            message: "Cars retrieved successfully",
            result
        })
    }
    catch (err: any) {
        res.status(500).send({ message: err.message })
    }
}