import { Request, Response } from "express"
import { z } from "zod"

import { PrismaUsersRepository } from "@/repositories/prisma/prismaUsers.repository"
import { cnpjRegex, cpfRegex } from "@/helpers/validateDocument.helper"
import { RegisterService } from "@/services/register.service"
import { BadRequestError } from "@/helpers/errors.helper"
import { logger } from "@/lib/logger"

export async function register(req: Request, res: Response) {
  const registerBodySchema = z.object({
    name: z.string().min(3).max(255),
    document: z
      .string()
      .regex(cpfRegex || cnpjRegex, "Invalid document, must be a CPF or CNPJ."),
    password: z.string().min(6).max(255),
  })

  const { name, document, password } = registerBodySchema.parse(req.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    const registerService = new RegisterService(usersRepository)

    await registerService.handle({ name, document, password })

    logger.info(`User with document: ${document} registered successfully.`)
  } catch (error) {
    if (error instanceof BadRequestError) {
      return res.status(400).json({ message: error.message })
    }
  }

  return res.status(201).json()
}
