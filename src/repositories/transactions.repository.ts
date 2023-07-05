import { Prisma, Transaction } from "@prisma/client"

export interface ITransactionsRepository {
  create: (data: Prisma.TransactionCreateInput) => Promise<Transaction>
  findTransactionsByAccountId: (accountId: string) => Promise<Transaction[]>
}
