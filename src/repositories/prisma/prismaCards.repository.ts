import { Prisma } from "@prisma/client"

import prisma from "@/lib/database"
import { ICardsRepository } from "@/repositories/cards.repository"

export class PrismaCardsRepository implements ICardsRepository {
  async createCard(data: Prisma.CardCreateInput) {
    const card = await prisma.card.create({ data })

    return card
  }

  async findCardsByAccountId(accountId: string) {
    const cards = await prisma.card.findMany({
      where: { accountId },
    })

    return cards
  }

  async findCardsByUserId(userId: string) {
    const cards = await prisma.card.findMany({
      where: { account: { userId } },
    })

    return cards
  }
}
