import { Request, Response } from "express"

import { buildListCardsByUserService } from "@/factories/buildListCardsByUserService"

export class ListCardsByUserController {
  async list(req: Request, res: Response) {
    const userId = req.user.id ?? ""

    const listCards = buildListCardsByUserService()

    const { cards } = await listCards.handle({ userId })

    return res.json(cards)
  }
}
