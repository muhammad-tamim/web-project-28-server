// bookings.types.ts
import z from "zod"
import { createBookingSchema, updateBookingSchema } from "./bookings.validations.js"

export type CreateBookingInput = z.infer<typeof createBookingSchema>
export type UpdateBookingInput = z.infer<typeof updateBookingSchema>

export type PaymentInfo = {
    sessionId: string;
    paymentIntentId: string;
    amount: number;
    currency: string;
    status: string;
    paidAt: Date;
};

export type BookingDocument = CreateBookingInput & {
    totalCost: number;
    car: any;
    payment: PaymentInfo;
};
