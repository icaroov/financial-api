import { Request, Response } from "express"

import { buildGetAccountBalanceService } from "@/factories/buildGetAccountBalanceService"

export class GetAccountBalanceController {
  async getBalance(req: Request, res: Response) {
    const getAccountBalanceService = buildGetAccountBalanceService()

    const { balance } = await getAccountBalanceService.handle({
      accountId: req.params.accountId ?? "",
    })

    return res.json({ balance })
  }
}
