import { Request, Response } from "express"
import { z } from "zod"

import { buildRegisterService } from "@/factories/buildRegisterService"
import { cnpjRegex, cpfRegex } from "@/helpers/validateFields"
import { logger } from "@/lib/logger"

export class RegisterController {
  async register(req: Request, res: Response) {
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

    const registerService = buildRegisterService()

    await registerService.handle({ name, document, password })

    logger.info(`User with document: ${document} registered successfully.`)

    return res.status(201).json()
  }
}
