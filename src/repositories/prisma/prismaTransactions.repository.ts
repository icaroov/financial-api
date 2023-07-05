import { Prisma, Transaction } from "@prisma/client"

import prisma from "@/lib/database"
import { ITransactionsRepository } from "@/repositories/transactions.repository"

export class PrismaTransactionsRepository implements ITransactionsRepository {
  async create(data: Prisma.TransactionCreateInput): Promise<Transaction> {
    const transaction = await prisma.transaction.create({ data })

    return transaction
  }

  async findTransactionsByAccountId(accountId: string): Promise<Transaction[]> {
    const transactions = await prisma.transaction.findMany({
      where: { accountId },
    })

    return transactions
  }
}
