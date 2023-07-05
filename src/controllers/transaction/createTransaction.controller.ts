import { Request, Response } from "express"
import { z } from "zod"

import { buildCreateTransactionService } from "@/factories/buildCreateTransactionService"

export class CreateTransactionController {
  async create(req: Request, res: Response) {
    const accountId = req.params.accountId ?? ""

    const createBodySchema = z.object({
      value: z.number().positive().min(0.01).max(1000000),
      description: z.string(),
      type: z.enum(["debit", "credit"]).default("debit"),
    })

    const { value, description, type } = createBodySchema.parse(req.body)

    const createTransactionService = buildCreateTransactionService()

    const { transaction } = await createTransactionService.handle({
      value,
      description,
      type,
      accountId,
    })

    return res.status(201).json(transaction)
  }
}
