import { PrismaCardsRepository } from "@/repositories/prisma/prismaCards.repository"
import { ListCardsByAccountService } from "@/services/card/listCardsByAccount.service"

export const buildListCardsByAccountService = () => {
  const cardsRepository = new PrismaCardsRepository()

  const listCards = new ListCardsByAccountService(cardsRepository)

  return listCards
}
