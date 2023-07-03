import { Request, Response } from "express"
import { z } from "zod"

import { buildLoginService } from "@/factories/buildLoginService"
import { logger } from "@/lib/logger"

export class LoginController {
  async login(req: Request, res: Response) {
    const authBodySchema = z.object({
      document: z.string().min(11).max(14),
      password: z.string().min(6).max(255),
    })

    const { document, password } = authBodySchema.parse(req.body)

    const loginService = buildLoginService()

    const { token } = await loginService.handle({ document, password })

    logger.info(`User with document: ${document} authenticated successfully.`)

    return res.status(200).json({
      token,
    })
  }
}
