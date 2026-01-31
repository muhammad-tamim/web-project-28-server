import express from 'express'
import cors from 'cors'
import { carsRoutes } from './cars/cars.routes.js'
import { bookingsRoutes } from './bookings/bookings.routes.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/cars', carsRoutes)
app.use('/bookings', bookingsRoutes)

app.get('/', (_req, res) => {
    res.send('Hello World!')
})

export default app