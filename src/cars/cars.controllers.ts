import { Request, Response } from "express";
import { carsService } from "./cars.services.js";

export const createCar = async (req: Request, res: Response) => {
    try {
        const result = await carsService.create(req.body)
        res.status(201).send(result)
    }
    catch (err) {
        res.status(500).send({ message: "Failed to create car" })
    }
}