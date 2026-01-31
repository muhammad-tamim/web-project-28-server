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