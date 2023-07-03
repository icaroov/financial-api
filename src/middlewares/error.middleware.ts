import { NextFunction, Request, Response } from "express"
import { AxiosError } from "axios"
import { ZodError } from "zod"

import {
  ApiError,
  InvalidDocumentError,
  UserAlreadyExistsError,
} from "@/helpers/errors.helper"
import { logger } from "@/lib/logger"

export const errorMiddleware = (
  error: Error & Partial<ApiError> & Partial<ZodError>,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error instanceof ZodError) {
    logger.error("Validation error.")

    return res
      .status(400)
      .json({ message: "Validation error.", errors: error.format() })
  }

  if (error instanceof UserAlreadyExistsError) {
    return res.status(409).json({ message: error.message })
  }

  if (error instanceof InvalidDocumentError) {
    return res.status(400).json({ message: error.message })
  }

  if (
    error instanceof AxiosError &&
    error.response &&
    error.response.status === 400
  ) {
    logger.error(`Invalid document.`)

    return res.status(400).json({ message: "Invalid document." })
  }

  const statusCode = error.statusCode ?? 500
  const message = error.statusCode ? error.message : "Internal Server Error"
  return res.status(statusCode).json({ message })
}
