import { PrismaAccountsRepository } from "@/repositories/prisma/prismaAccounts.repository"
import { PrismaCardsRepository } from "@/repositories/prisma/prismaCards.repository"
import { CreateCardForAccountService } from "@/services/card/createCardForAccount.service"

export const buildCreateCardForAccountService = () => {
  const accountsRepository = new PrismaAccountsRepository()
  const cardsRepository = new PrismaCardsRepository()

  const createCardForAccountService = new CreateCardForAccountService(
    cardsRepository,
    accountsRepository
  )

  return createCardForAccountService
}
