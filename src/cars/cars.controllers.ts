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
    try {
        const result = await carsService.findAll()
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