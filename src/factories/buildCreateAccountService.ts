import { PrismaAccountsRepository } from "@/repositories/prisma/prismaAccounts.repository"
import { PrismaUsersRepository } from "@/repositories/prisma/prismaUsers.repository"
import { CreateAccountService } from "@/services/account/createAccount.service"

export const buildCreateAccountService = () => {
  const usersRepository = new PrismaUsersRepository()
  const accountsRepository = new PrismaAccountsRepository()

  const createAccountService = new CreateAccountService(
    accountsRepository,
    usersRepository
  )

  return createAccountService
}
