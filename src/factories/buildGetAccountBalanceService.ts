import { PrismaAccountsRepository } from "@/repositories/prisma/prismaAccounts.repository"
import { GetAccountBalanceService } from "@/services/account/getAccountBalance.service"

export const buildGetAccountBalanceService = () => {
  const accountsRepository = new PrismaAccountsRepository()

  return new GetAccountBalanceService(accountsRepository)
}
