import { Request, Response } from "express";
import { typesCollection, typesService } from "./types.services.js";
import { success } from "zod";

export const createType = async (req: Request, res: Response) => {
    try {
        const result = await typesService.create(req.body)
        res.status(201).send({
            success: true,
            message: "Types created Successfully",
            result
        })
    }
    catch (err: any) {
        res.status(500).send({ message: err.message })
    }
}

export const getTypes = async (req: Request, res: Response) => {
    try {
        const result = await typesService.findAll()
        res.status(200).send({
            success: true,
            message: "Types retrieved successfully",
            result
        })
    }
    catch (err: any) {
        res.status(500).send({ message: err.message })
    }
}

export const updateType = async (req: Request, res: Response) => {
    try {
        const result = await typesService.update(req.params.id as string, req.body)
        res.status(200).send({
            success: true,
            message: "Type update successfully",
            result
        })
    }
    catch (err: any) {
        res.status(500).send({ message: err.message })
    }
}