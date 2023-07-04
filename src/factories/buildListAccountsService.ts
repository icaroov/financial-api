import { PrismaAccountsRepository } from "@/repositories/prisma/prismaAccounts.repository"
import { ListAccountsService } from "@/services/account/listAccounts.service"

export const buildListAccountsService = () => {
  const accountsRepository = new PrismaAccountsRepository()

  const listAccountsService = new ListAccountsService(accountsRepository)

  return listAccountsService
}
