import { Request, Response } from "express"

import { buildListAccountsService } from "@/factories/buildListAccountsService"

export class ListAccountsController {
  async list(_req: Request, res: Response) {
    const listAccountsService = buildListAccountsService()

    const { accounts } = await listAccountsService.handle()

    return res.json(accounts)
  }
}
