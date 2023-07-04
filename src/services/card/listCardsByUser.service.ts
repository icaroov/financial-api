import { Card } from "@prisma/client"

import { ICardsRepository } from "@/repositories/cards.repository"
import { logger } from "@/lib/logger"

interface ListCardsByUserRequest {
  userId: string
}

interface ListCardsByUserResponse {
  cards: Card[]
}

export class ListCardsByUserService {
  constructor(private cardsRepository: ICardsRepository) {}

  async handle({
    userId,
  }: ListCardsByUserRequest): Promise<ListCardsByUserResponse> {
    const cards = await this.cardsRepository.findCardsByUserId(userId)

    logger.info("Listed cards by user.")

    return { cards }
  }
}
