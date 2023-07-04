import { Request, Response } from "express"
import { z } from "zod"

import { buildCreateAccountService } from "@/factories/buildCreateAccountService"
import { accountRegex } from "@/helpers/validateFields"
import { logger } from "@/lib/logger"

export class CreateAccountController {
  async create(req: Request, res: Response) {
    const createBodySchema = z.object({
      account: z
        .string()
        .regex(accountRegex, "Invalid account format, must be XXXXXX-X"),
      branch: z.string().min(3).max(3),
    })

    const { account: accountNumber, branch } = createBodySchema.parse(req.body)

    const createAccountService = buildCreateAccountService()

    const { account } = await createAccountService.handle({
      account: accountNumber,
      branch,
      request: req,
    })

    logger.info("Account created successfully.")

    return res.status(201).json(account)
  }
}
