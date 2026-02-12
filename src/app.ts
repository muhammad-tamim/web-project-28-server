import express from 'express'
import cors from 'cors'
import { carsRoutes } from './modules/cars/cars.routes.js'
import { bookingsRoutes } from './modules/bookings/bookings.routes.js'
import { brandsRoutes } from './modules/carBrands/brands.routes.js'
import { categoriesRoutes } from './modules/carCategories/categories.routes.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/cars', carsRoutes)
app.use('/brands', brandsRoutes)
app.use('/categories', categoriesRoutes)
app.use('/bookings', bookingsRoutes)

app.get('/', (_req, res) => {
    res.send('Hello World!')
})

export default app