import 'dotenv/config'
import express from "express"
import exercisesRoutes from './src/exercises_controller.mjs'
import asyncHandler from 'express-async-handler';

const app = express()
const port = process.env.PORT

app.use(express.json())

exercisesRoutes(app)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})