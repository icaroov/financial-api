import { Request, Response } from "express"
import { z } from "zod"

import { PrismaUsersRepository } from "@/repositories/prisma/prismaUsers.repository"
import { cnpjRegex, cpfRegex } from "@/helpers/validateDocument.helper"
import { RegisterService } from "@/services/register.service"
import { ComplianceService } from "@/services/compliance.service"
import { logger } from "@/lib/logger"

export async function register(req: Request, res: Response) {
  const registerBodySchema = z.object({
    name: z.string().min(3).max(255),
    document: z
      .string()
      .regex(
        cpfRegex || cnpjRegex,
        "Invalid document format, must be a CPF (XXX.XXX.XXX-XX) or CNPJ (XX.XXX.XXX/XXXX-XX)"
      ),
    password: z.string().min(6).max(255),
  })

  const { name, document, password } = registerBodySchema.parse(req.body)

  const usersRepository = new PrismaUsersRepository()
  const complianceService = new ComplianceService()

  const registerService = new RegisterService(
    usersRepository,
    complianceService
  )

  await registerService.handle({ name, document, password })

  logger.info(`User with document: ${document} registered successfully.`)

  return res.status(201).json()
}
