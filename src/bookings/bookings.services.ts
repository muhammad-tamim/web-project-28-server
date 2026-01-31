import { ObjectId } from "mongodb";
import { carsCollection } from "../cars/cars.services.js";
import { client } from "../config/db.js";
import { CreateBookingInput, UpdateBookingInput } from "./bookings.types.js";

const bookingsCollection = client.db("web-project-28-DB").collection<CreateBookingInput & { totalCost: number }>("bookings");

export const bookingsService = {
    async create(booking: CreateBookingInput) {
        // Find car
        const car = await carsCollection.findOne({ _id: new ObjectId(booking.carId) });

        if (!car) {
            throw new Error("Car not found");
        }

        if (!car.availability) {
            throw new Error("Car is not available");
        }

        // days
        const days = Math.ceil(
            (booking.endDate.getTime() - booking.startDate.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (days <= 0) {
            throw new Error("Invalid booking duration");
        }

        // total cost
        const totalCost = days * car.dailyRentalPrice;

        // Update car
        const filter = { _id: car._id, availability: true }
        const updatedDoc = {
            $inc: { bookingCount: 1 },
            $set: {
                bookingStatus: true,
                availability: false,
            },
        }
        const updatedResult = await carsCollection.updateOne(filter, updatedDoc);

        if (updatedResult.modifiedCount === 0) {
            throw new Error("Car already booked");
        }

        // Insert booking
        return bookingsCollection.insertOne({ ...booking, totalCost });
    },

    update(id: string, data: UpdateBookingInput) {
        return bookingsCollection.updateOne({ _id: new ObjectId(id) }, { $set: data as any })
    }
};