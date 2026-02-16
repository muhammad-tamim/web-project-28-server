import { Request, Response } from "express";
import { usersService } from "./users.services.js";

export const createUser = async (req: Request, res: Response) => {
    try {
        const result = await usersService.create(req.body)
        res.status(201).send({
            success: true,
            message: "User created successfully",
            result
        })
    }
    catch (err: any) {
        res.status(500).send({ message: err.message })
    }
}

export const getUsers = async (req: Request, res: Response) => {
    const page = Number(req.query.page)
    const limit = Number(req.query.limit)
    try {
        const users = await usersService.findAll(page, limit)
        const total = await usersService.countAll()
        res.status(200).send({
            success: true,
            message: "Users retrieved successfully",
            result: users,
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

export const getUserByEmail = async (req: Request, res: Response) => {
    try {
        const result = await usersService.findOneByEmail(req.params.email as string)
        res.status(200).send({
            success: true,
            message: "User retrieved successfully",
            result
        })
    }
    catch (err: any) {
        res.status(500).send({ message: err.message })
    }
}