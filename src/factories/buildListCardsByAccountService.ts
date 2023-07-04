import { PrismaAccountsRepository } from "@/repositories/prisma/prismaAccounts.repository"
import { ListCardsByAccountService } from "@/services/account/listCardsByAccount.service"

export const buildListCardsByAccountService = () => {
  const accountsRepository = new PrismaAccountsRepository()

  const listCards = new ListCardsByAccountService(accountsRepository)

  return listCards
}
