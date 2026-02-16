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