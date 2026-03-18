// bookings.service.ts
import { ObjectId } from "mongodb";
import { carsCollection } from "../../modules/cars/cars.services.js";
import { paymentsCollection } from "../sslcommerzPayments/sslcommerz.services.js";
import { client } from "../../config/db.js";
import ExcelJS from "exceljs";
import { format } from "date-fns";
import { transporter } from "../../utils/nodemailer.js";

export const bookingsCollection = client.db("web-project-28-DB").collection("bookings");

export const bookingsService = {

    async create(payload: any) {

        const { tran_id, carId, cus_name, cus_email, total_amount, startDate, endDate, currency, cus_photoUrl } = payload;


        // 1️⃣ Check if a booking already exists for this transaction
        const existingBooking = await bookingsCollection.findOne({ tran_id });
        if (existingBooking) return existingBooking;

        // 2️⃣ Get the car
        const car = await carsCollection.findOne({ _id: new ObjectId(carId) });
        if (!car) throw new Error("Car not found");

        // 3️⃣ Prepare booking info
        const bookingInfo = {
            tran_id,
            carId,
            email: cus_email,
            startDate,
            endDate,
            totalCost: total_amount,
            car,
            payment: {
                tran_id,
                paymentStatus: 'complete', // since frontend demo
                total_amount,
                currency,
                cus_name,
                cus_email,
                cus_photoUrl,
                createdAt: new Date()
            },
            createdAt: new Date(),
        };

        // 4️⃣ Insert booking
        const result = await bookingsCollection.insertOne(bookingInfo as any);


        // 5️⃣ Update car stats
        await carsCollection.updateOne(
            { _id: new ObjectId(carId) },
            {
                $set: { availability: false, bookingStatus: true },
                $inc: { bookingCount: 1 }
            }
        );


        // 6️⃣ Send email notification
        const emailHtml = `
            <h2>Booking Confirmed!</h2>
            <p>Hi ${cus_name},</p>
            <p>Your payment of <b>${total_amount} ${currency}</b> was successful.</p>
            <p>Your booking for <b>${car.name}</b> from <b>${startDate}</b> to <b>${endDate}</b> has been created.</p>
            <p>Invoice ID: <b>${tran_id}</b></p>
            <p>Thank you for choosing our service!</p>
        `;


        await transporter.sendMail({
            from: `"REXTAX" ${process.env.GOOGLE_APP_USER}`,
            to: cus_email,
            subject: `Booking Confirmed - ${tran_id}`,
            html: emailHtml,
        });


        return { _id: result.insertedId, ...bookingInfo };
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
    },

    async findBookingByTranId(tran_id: string) {
        return bookingsCollection.findOne({ tran_id })
    }
};