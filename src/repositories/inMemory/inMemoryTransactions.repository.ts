import { Prisma, Transaction } from "@prisma/client"

import { ITransactionsRepository } from "@/repositories/transactions.repository"

export class InMemoryTransactionsRepository implements ITransactionsRepository {
  public transactions: Transaction[] = []
  async create(data: Prisma.TransactionCreateInput) {
    const transaction: Transaction = {
      id: String(this.transactions.length + 1),
      accountId: data.account.connect?.id ?? "",
      value: data.value,
      type: data.type,
      description: data.description ?? "",
      receiverAccountId: data.receiverAccountId ?? "",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.transactions.push(transaction)

    return transaction
  }

  async findTransactionsByAccountId(accountId: string): Promise<Transaction[]> {
    const transactions = this.transactions.filter(
      transaction => transaction.accountId === accountId
    )

    return transactions
  }
}
