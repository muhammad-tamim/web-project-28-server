import { Request, Response } from "express";
import { categoriesService } from "./categories.services.js";

export const createCategory = async (req: Request, res: Response) => {
    try {
        const result = await categoriesService.create(req.body)
        res.status(201).send({
            success: true,
            message: "Category created Successfully",
            result
        })
    }
    catch (err: any) {
        res.status(500).send({ message: err.message })
    }
}

export const getCategories = async (req: Request, res: Response) => {
    try {
        const result = await categoriesService.findAll()
        res.status(200).send({
            success: true,
            message: "Categories retrieved successfully",
            result
        })
    }
    catch (err: any) {
        res.status(500).send({ message: err.message })
    }
}

export const updateCategory = async (req: Request, res: Response) => {
    try {
        const result = await categoriesService.update(req.params.id as string, req.body)
        res.status(200).send({
            success: true,
            message: "Category update successfully",
            result
        })
    }
    catch (err: any) {
        res.status(500).send({ message: err.message })
    }
}

export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const result = await categoriesService.delete(req.params.id as string)
        res.status(200).send({
            success: true,
            message: "Category Delete successfully",
            result
        })
    }
    catch (err: any) {
        res.status(500).send({ message: err.message })
    }
}

export const countAllCategory = async (req: Request, res: Response) => {
    try {
        const result = await categoriesService.countAll()
        res.status(200).send({
            success: true,
            message: "Category count retrieved successfully",
            result
        })
    }
    catch (err: any) {
        res.status(500).send({ message: err.message })
    }
}