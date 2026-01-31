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
        const days = Math.ceil((booking.endDate.getTime() - booking.startDate.getTime()) / (1000 * 60 * 60 * 24));

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

    findAll(userEmail: string) {
        return bookingsCollection.find({ userEmail }).toArray()
    },

    async update(id: string, data: UpdateBookingInput) {
        const booking = await bookingsCollection.findOne({ _id: new ObjectId(id) });

        if (!booking) {
            throw new Error("Booking not found");
        }

        const newStart = data.startDate ?? booking.startDate;
        const newEnd = data.endDate ?? booking.endDate;


        if (newEnd.getTime() <= newStart.getTime()) {
            throw new Error("Invalid booking duration");
        }

        const newDays = Math.ceil((newEnd.getTime() - newStart.getTime()) / (1000 * 60 * 60 * 24));
        const previousDays = (booking.endDate.getTime() - booking.startDate.getTime()) / (1000 * 60 * 60 * 24)
        const previousTotalCost = booking.totalCost
        const NewTotalCost = newDays * previousTotalCost / previousDays

        const filter = { _id: new ObjectId(id) }
        const updatedDoc = {
            $set: {
                startDate: newStart,
                endDate: newEnd,
                totalCost: NewTotalCost
            }
        }
        return bookingsCollection.updateOne(filter, updatedDoc)
    },

    delete(id: string) {
        return bookingsCollection.deleteOne({ _id: new ObjectId(id) })
    },
};