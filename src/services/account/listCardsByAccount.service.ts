import { IAccountsRepository } from "@/repositories/accounts.repository"
import { logger } from "@/lib/logger"
import { Card } from "@prisma/client"

interface ListCardsByAccountRequest {
  accountId: string
}

interface ListCardsByAccountResponse {
  cards: Card[]
}

export class ListCardsByAccountService {
  constructor(private accountsRepository: IAccountsRepository) {}

  async handle({
    accountId,
  }: ListCardsByAccountRequest): Promise<ListCardsByAccountResponse> {
    const cards = await this.accountsRepository.findCardsByAccountId(accountId)

    logger.info("Listed cards.")

    return { cards }
  }
}
