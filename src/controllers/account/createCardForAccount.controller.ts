import { Request, Response } from "express"
import { z } from "zod"

import { buildCreateCardForAccountService } from "@/factories/buildCreateCardForAccountService"
import { cardRegex } from "@/helpers/validateFields"
import { logger } from "@/lib/logger"

export class CreateCardForAccountController {
  async create(req: Request, res: Response) {
    const createBodySchema = z.object({
      cvv: z.string().regex(/^[0-9]{3}$/, "Invalid CVV format, must be XXX"),
      type: z.enum(["virtual", "physical"]),
      number: z
        .string()
        .regex(
          cardRegex,
          "Invalid card number format, must be XXXX XXXX XXXX XXXX"
        ),
    })

    const { number: cardNumber, cvv, type } = createBodySchema.parse(req.body)

    const createCardForAccountService = buildCreateCardForAccountService()

    const { card } = await createCardForAccountService.handle({
      cvv,
      type,
      number: cardNumber,
      accountId: req.params.accountId,
    })

    logger.info("Card created successfully.")

    return res.status(201).json({
      ...card,
      number: card.number.slice(-4),
    })
  }
}
