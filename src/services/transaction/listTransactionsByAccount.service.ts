import { Transaction } from "@prisma/client"

import { logger } from "@/lib/logger"
import { ITransactionsRepository } from "@/repositories/transactions.repository"

interface ListTransactionsByAccountServiceRequest {
  accountId: string
}

interface ListTransactionsByAccountServiceResponse {
  transactions: Transaction[]
}

export class ListTransactionsByAccountService {
  constructor(private transactionsRepository: ITransactionsRepository) {}

  async handle({
    accountId,
  }: ListTransactionsByAccountServiceRequest): Promise<ListTransactionsByAccountServiceResponse> {
    const transactions =
      await this.transactionsRepository.findTransactionsByAccountId(accountId)

    logger.info("Listed transactions.")

    return { transactions }
  }
}
