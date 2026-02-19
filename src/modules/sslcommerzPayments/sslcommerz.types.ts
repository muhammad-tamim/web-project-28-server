import { z } from "zod";
import { ObjectId } from "mongodb";
import { initPaymentSchema } from "./sslcommerz.validations.js";

export type InitPaymentInput = z.infer<typeof initPaymentSchema>;

export interface Payment {
    _id?: ObjectId;
    tran_id: string;
    val_id?: string;
    carId: string;
    total_amount: string;
    currency: string;
    product_category: string;
    product_name: string;
    product_profile: string;

    cus_name: string;
    cus_email: string;
    cus_add1: string;
    cus_city: string;
    cus_postcode: string;
    cus_country: string;
    cus_phone: string;

    paymentStatus: "pending" | "complete" | "failed";
    createdAt: Date;
    updatedAt?: Date;
}
