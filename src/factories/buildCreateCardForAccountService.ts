import { PrismaAccountsRepository } from "@/repositories/prisma/prismaAccounts.repository"
import { CreateCardForAccountService } from "@/services/account/createCardForAccount.service"

export const buildCreateCardForAccountService = () => {
  const accountsRepository = new PrismaAccountsRepository()

  const createCardForAccountService = new CreateCardForAccountService(
    accountsRepository
  )

  return createCardForAccountService
}
