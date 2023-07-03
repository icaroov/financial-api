import express from "express"
import "express-async-errors"

import { routes } from "@/routes"

import { errorMiddleware } from "@/middlewares/error.middleware"

const app = express()

app.use(express.json())
app.use(routes)

app.use(errorMiddleware)

export { app }
