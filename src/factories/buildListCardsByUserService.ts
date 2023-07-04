import { PrismaCardsRepository } from "@/repositories/prisma/prismaCards.repository"
import { ListCardsByUserService } from "@/services/card/listCardsByUser.service"

export const buildListCardsByUserService = () => {
  const cardsRepository = new PrismaCardsRepository()

  const listCards = new ListCardsByUserService(cardsRepository)

  return listCards
}
