import { PrismaAccountsRepository } from "@/repositories/prisma/prismaAccounts.repository"
import { PrismaTransactionsRepository } from "@/repositories/prisma/prismaTransactions.repository"
import { CreateTransactionService } from "@/services/transaction/createTransaction.service"

export const buildCreateTransactionService = () => {
  const transactionsRepository = new PrismaTransactionsRepository()
  const accountsRepository = new PrismaAccountsRepository()

  return new CreateTransactionService(
    transactionsRepository,
    accountsRepository
  )
}
