import express from 'express'
import cors from 'cors'
// import { notesRoutes } from './cars/cars.route.js'

const app = express()

app.use(cors())
app.use(express.json())

// app.use('/notes', notesRoutes)

app.get('/', (_req, res) => {
    res.send('Hello World!')
})

export default app