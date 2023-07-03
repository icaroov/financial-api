import express, { Request, Response, NextFunction } from "express"

import { routes } from "@/routes"

import { logger } from "./lib/logger"

const app = express()

app.use(express.json())
app.use(routes)

app.use(
  (err: Error, _request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof Error) {
      logger.error(err.message)

      return response.status(400).json({ message: err.message })
    }

    logger.error(`Internal server error - ${err}`)

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err}`,
    })
  }
)

export { app }
