// bookings.service.ts
import { ObjectId } from "mongodb";
import { carsCollection } from "../../modules/cars/cars.services.js";
import { client } from "../../config/db.js";
import { BookingDocument, CreateBookingInput, PaymentInfo, UpdateBookingInput } from "./bookings.types.js";

const bookingsCollection = client.db("web-project-28-DB").collection<BookingDocument>("bookings");

export const bookingsService = {
    async create(booking: CreateBookingInput, payment: PaymentInfo) {
        // 1️⃣ Check if booking with this payment already exists
        const existingBooking = await bookingsCollection.findOne({ "payment.sessionId": payment.sessionId });
        if (existingBooking) {
            return existingBooking; // Booking already exists, return it
        }

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

        const updatedCar = await carsCollection.findOne({ _id: car._id });

        const bookingData = {
            ...booking,
            totalCost,
            car: updatedCar,
            payment,
            createdAt: new Date()
        };

        // Insert booking
        return bookingsCollection.insertOne(bookingData);
    },

    findAll(email: string) {
        return bookingsCollection.find({ email }).toArray()
    },

    findAllBySellerEmail(email: string) {
        return bookingsCollection.find({ 'car.email': email }).toArray()
    },

    findAllBySellerEmailWithPagination(email: string, page = 1, limit = 9) {
        const skip = (page - 1) * limit
        return bookingsCollection.find({ 'car.email': email }).sort({ createdAt: -1 }).skip(skip).limit(limit).toArray()
    },

    countAllBySellerEmail(email: string) {
        return bookingsCollection.countDocuments({ 'car.email': email })
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

        const days = Math.ceil((newEnd.getTime() - newStart.getTime()) / (1000 * 60 * 60 * 24));

        const car = await carsCollection.findOne({ _id: new ObjectId(booking.carId) });

        if (!car) {
            throw new Error("Car not found");
        }

        const totalCost = days * car.dailyRentalPrice;


        const filter = { _id: new ObjectId(id) }
        const updatedDoc = {
            $set: {
                startDate: newStart,
                endDate: newEnd,
                totalCost
            }
        }
        return bookingsCollection.updateOne(filter, updatedDoc)
    },

    async delete(id: string) {
        const booking = await bookingsCollection.findOne({ _id: new ObjectId(id) });

        if (!booking) {
            throw new Error("Booking not found");
        }

        await bookingsCollection.deleteOne({ _id: booking._id });

        const filter = { _id: new ObjectId(booking.carId) }
        const updatedDoc = {
            $inc: { bookingCount: -1 },
            $set: {
                availability: true,
                bookingStatus: false,
            },
        }

        await carsCollection.updateOne(filter, updatedDoc);

        return {
            success: true,
            message: "Booking deleted successfully",
        };
    }
};