import { Request, Response } from "express"

import { buildListTransactionsByAccountService } from "@/factories/buildListTransactionsByAccountService"

export class ListTransactionsByAccountController {
  async list(req: Request, res: Response) {
    const accountId = req.params.accountId ?? ""

    const listTransactions = buildListTransactionsByAccountService()

    const { transactions } = await listTransactions.handle({ accountId })

    return res.json(transactions)
  }
}
