import { Transaction } from "@prisma/client"

import { logger } from "@/lib/logger"
import { ResourceNotFoundError } from "@/helpers/errors.helper"
import { IAccountsRepository } from "@/repositories/accounts.repository"
import { ITransactionsRepository } from "@/repositories/transactions.repository"

interface CreateTransactionServiceRequest {
  value: number
  description: string
  type: Transaction["type"]
  accountId: string
}

interface CreateTransactionServiceResponse {
  transaction: Transaction
}

export class CreateTransactionService {
  constructor(
    private transactionsRepository: ITransactionsRepository,
    private accountsRepository: IAccountsRepository
  ) {}

  async handle({
    value,
    description,
    type = "debit",
    accountId,
  }: CreateTransactionServiceRequest): Promise<CreateTransactionServiceResponse> {
    const account = await this.accountsRepository.findAccountById(accountId)

    if (!account) {
      logger.error(`Account ${accountId} not found.`)
      throw new ResourceNotFoundError("Account not found.")
    }

    const transaction = await this.transactionsRepository.create({
      value,
      description,
      type,
      account: {
        connect: {
          id: account.id,
        },
      },
    })

    logger.info(`Transaction ${transaction.id} created.`)

    return { transaction }
  }
}
