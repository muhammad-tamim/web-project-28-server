import { NextFunction, Request, Response } from "express";
import { usersCollection } from "../modules/users/users.services.js";

export const verifySeller = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user || !req.user.email) {
            return res.status(401).json({ message: "Authentication required" });
        }

        const email = req.user?.email
        const user = await usersCollection.findOne({ email });

        if (!user || user.role !== "seller") {
            return res.status(403).json({
                message: "Seller only action",
            });
        }

        next();
    } catch (error) {
        console.error("verifySeller error:", error);
        return res.status(500).json({ message: "Authorization failed" });
    }
}