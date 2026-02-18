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

export const updateUser = async (req: Request, res: Response) => {
    try {
        const result = await usersService.update(req.params.id as string, req.body)
        res.status(200).send({
            success: true,
            message: "User update successfully",
            result
        })
    }
    catch (err: any) {
        res.status(500).send({ message: err.message })
    }
}

export const getCountAll = async (req: Request, res: Response) => {
    try {
        const result = await usersService.countAll()
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

export const getCountAllCustomer = async (req: Request, res: Response) => {
    try {
        const result = await usersService.countAllCustomer()
        res.status(200).send({
            success: true,
            message: "User with role customer count retrieved successfully",
            result
        })
    }
    catch (err: any) {
        res.status(500).send({ message: err.message })
    }
}

export const getCountAllSeller = async (req: Request, res: Response) => {
    try {
        const result = await usersService.countAllSeller()
        res.status(200).send({
            success: true,
            message: "User with role seller count retrieved successfully",
            result
        })
    }
    catch (err: any) {
        res.status(500).send({ message: err.message })
    }
}

export const getCountAllAdmin = async (req: Request, res: Response) => {
    try {
        const result = await usersService.countAllAdmin()
        res.status(200).send({
            success: true,
            message: "User with role admin count retrieved successfully",
            result
        })
    }
    catch (err: any) {
        res.status(500).send({ message: err.message })
    }
}

export const getRecentSellers = async (req: Request, res: Response) => {
    try {
        const result = await usersService.findRecentSellers()
        res.status(200).send({
            success: true,
            message: "User with role seller retrieved successfully",
            result
        })
    }
    catch (err: any) {
        res.status(500).send({ message: err.message })
    }
}

export const getRecentCustomers = async (req: Request, res: Response) => {
    try {
        const result = await usersService.findRecentCustomers()
        res.status(200).send({
            success: true,
            message: "User with role customer retrieved successfully",
            result
        })
    }
    catch (err: any) {
        res.status(500).send({ message: err.message })
    }
}