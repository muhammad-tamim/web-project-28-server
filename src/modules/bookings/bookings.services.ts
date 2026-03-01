// bookings.service.ts
import { ObjectId } from "mongodb";
import { carsCollection } from "../../modules/cars/cars.services.js";
import { paymentsCollection } from "../sslcommerzPayments/sslcommerz.services.js";
import { client } from "../../config/db.js";
import ExcelJS from "exceljs";
import { format } from "date-fns";
import { transporter } from "../../utils/nodemailer.js";

const bookingsCollection = client.db("web-project-28-DB").collection("bookings");

export const bookingsService = {

    async create(tran_id: string) {
        // 1️⃣ Find the payment
        const payment = await paymentsCollection.findOne({ tran_id });
        if (!payment) throw new Error("Payment not found");
        if (payment.paymentStatus !== "complete") throw new Error("Payment not completed");

        // 2️⃣ Check if a booking already exists for this transaction
        const existingBooking = await bookingsCollection.findOne({ tran_id });
        if (existingBooking) {
            return existingBooking; // Return existing booking instead of creating a duplicate
        }

        const car = await carsCollection.findOne({ _id: new ObjectId(payment.carId) });
        if (!car) throw new Error("Car not found");

        const bookingInfo = {
            tran_id,
            carId: payment.carId,
            email: payment.cus_email,
            startDate: payment.startDate,
            endDate: payment.endDate,
            totalCost: payment.total_amount,
            car,
            payment,
            createdAt: new Date(),
        };

        // 5️⃣ Insert the booking
        const result = await bookingsCollection.insertOne(bookingInfo as any);

        // 6️⃣ Update car stats
        const updateResult = await carsCollection.updateOne(
            { _id: new ObjectId(payment.carId) },
            {
                $set: { availability: false, bookingStatus: true },
                $inc: { bookingCount: 1 }
            })

        // 7️⃣ Send simple email notification
        const emailHtml = `
    <h2>Booking Confirmed!</h2>
    <p>Hi ${payment.cus_name},</p>
    <p>Your payment of <b>${payment.total_amount} ${payment.currency}</b> was successful.</p>
    <p>Your booking for <b>${car.name}</b> from <b>${payment.startDate}</b> to <b>${payment.endDate}</b> has been created.</p>
    <p>Invoice ID: <b>${tran_id}</b></p>
    <p>Thank you for choosing our service!</p>
  `;

        await transporter.sendMail({
            from: `"REXTAX" ${process.env.GOOGLE_APP_USER}`,
            to: payment.cus_email,
            subject: `Booking Confirmed - ${tran_id}`,
            html: emailHtml,
        });

        return result
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

    findAllBookings() {
        return bookingsCollection.find().toArray()
    },

    findAllBookingsWithPagination(page = 1, limit = 9) {
        const skip = (page - 1) * limit
        return bookingsCollection.find().sort({ createdAt: -1 }).skip(skip).limit(limit).toArray()
    },


    countAll() {
        return bookingsCollection.countDocuments()
    },

    countAllBySellerEmail(email: string) {
        return bookingsCollection.countDocuments({ 'car.email': email })
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
    },

    async createReport() {
        // Fetch all bookings
        const bookings = await bookingsCollection.find().sort({ createdAt: -1 }).toArray();

        // Create workbook & worksheet
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet("Sales Report");

        // Define columns
        sheet.columns = [
            { header: "Car Image", key: "carImage", width: 30 },
            { header: "Car Name", key: "carName", width: 25 },
            { header: "Seller Email", key: "sellerEmail", width: 25 },
            { header: "Customer Email", key: "customerEmail", width: 25 },
            { header: "Payment Date", key: "paymentDate", width: 20 },
            { header: "Transaction ID", key: "transactionId", width: 35 },
            { header: "Payment Amount", key: "paymentAmount", width: 15 },
        ];

        // Add rows
        bookings.forEach((booking) => {
            sheet.addRow({
                carImage: booking.car.photoUrl,
                carName: booking.car.name,
                sellerEmail: booking.car.email,
                customerEmail: booking.email,
                paymentDate: format(new Date(booking.payment.createdAt), 'PP, p'),
                transactionId: booking.payment.tran_id,
                paymentAmount: booking.payment.total_amount,
            });
        });

        // Style header row
        sheet.getRow(1).eachCell((cell) => {
            cell.font = { bold: true };
            cell.alignment = { vertical: "middle", horizontal: "center" };
        });

        return workbook
    }
};