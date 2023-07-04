import { Card } from "@prisma/client"

import { ICardsRepository } from "@/repositories/cards.repository"
import { logger } from "@/lib/logger"

interface ListCardsByAccountRequest {
  accountId: string
}

interface ListCardsByAccountResponse {
  cards: Card[]
}

export class ListCardsByAccountService {
  constructor(private cardsRepository: ICardsRepository) {}

  async handle({
    accountId,
  }: ListCardsByAccountRequest): Promise<ListCardsByAccountResponse> {
    const cards = await this.cardsRepository.findCardsByAccountId(accountId)

    logger.info("Listed cards.")

    return { cards }
  }
}
