import { Request, Response } from "express"

import { buildListCardsByAccountService } from "@/factories/buildListCardsByAccountService"

export class ListCardsByAccountController {
  async list(req: Request, res: Response) {
    const accountId = req.params.accountId ?? ""

    const listCards = buildListCardsByAccountService()

    const { cards } = await listCards.handle({ accountId })

    return res.json(cards)
  }
}
