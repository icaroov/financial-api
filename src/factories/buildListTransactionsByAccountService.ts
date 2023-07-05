import { PrismaTransactionsRepository } from "@/repositories/prisma/prismaTransactions.repository"
import { ListTransactionsByAccountService } from "@/services/transaction/listTransactionsByAccount.service"

export const buildListTransactionsByAccountService = () => {
  const transactionsRepository = new PrismaTransactionsRepository()

  return new ListTransactionsByAccountService(transactionsRepository)
}
