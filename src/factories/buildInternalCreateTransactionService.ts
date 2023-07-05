import { PrismaAccountsRepository } from "@/repositories/prisma/prismaAccounts.repository"
import { PrismaTransactionsRepository } from "@/repositories/prisma/prismaTransactions.repository"
import { CreateInternalTransactionService } from "@/services/transaction/createInternalTransaction.service"

export const buildCreateInternalTransactionService = () => {
  const transactionsRepository = new PrismaTransactionsRepository()
  const accountsRepository = new PrismaAccountsRepository()

  return new CreateInternalTransactionService(
    transactionsRepository,
    accountsRepository
  )
}
