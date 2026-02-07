import { Request, Response } from "express";
import { brandsService } from "./brands.services.js";

export const createBrand = async (req: Request, res: Response) => {
    try {
        const result = await brandsService.create(req.body)
        res.status(201).send({
            success: true,
            message: "Brand created successfully",
            result
        })
    }
    catch (err: any) {
        res.status(500).send({ message: err.message })
    }
}

export const getBrands = async (req: Request, res: Response) => {
    try {
        const result = await brandsService.findAll()
        res.status(200).send({
            success: true,
            message: "Brands retrieved successfully",
            result
        })
    }
    catch (err: any) {
        res.status(500).send({ message: err.message })
    }
}

export const updateBrand = async (req: Request, res: Response) => {
    try {
        const result = await brandsService.update(req.params.id as string, req.body)
        res.status(200).send({
            success: true,
            message: "Brand update successfully",
            result
        })
    }
    catch (err: any) {
        res.status(500).send({ message: err.message })
    }
}
