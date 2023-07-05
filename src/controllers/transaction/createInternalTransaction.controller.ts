import { Request, Response } from "express"
import { z } from "zod"

import { buildCreateInternalTransactionService } from "@/factories/buildInternalCreateTransactionService"

export class CreateInternalTransactionController {
  async create(req: Request, res: Response) {
    const accountId = req.params.accountId ?? ""

    const createBodySchema = z.object({
      value: z.number().positive().min(0.01).max(1000000),
      description: z.string(),
      type: z.enum(["debit", "credit"]).default("debit"),
      receiverAccountId: z.string(),
    })

    const { value, description, type, receiverAccountId } =
      createBodySchema.parse(req.body)

    const createInternalTransactionService =
      buildCreateInternalTransactionService()

    const { transaction } = await createInternalTransactionService.handle({
      value,
      description,
      type,
      accountId,
      receiverAccountId,
    })

    return res.status(201).json(transaction)
  }
}
