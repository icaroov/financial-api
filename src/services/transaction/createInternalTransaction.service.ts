import { Transaction } from "@prisma/client"

import { logger } from "@/lib/logger"
import { ResourceNotFoundError } from "@/helpers/errors.helper"
import { IAccountsRepository } from "@/repositories/accounts.repository"
import { ITransactionsRepository } from "@/repositories/transactions.repository"

interface CreateInternalTransactionServiceRequest {
  value: number
  description: string
  type: Transaction["type"]
  accountId: string
  receiverAccountId: string
}

interface CreateInternalTransactionServiceResponse {
  transaction: Transaction
}

export class CreateInternalTransactionService {
  constructor(
    private transactionsRepository: ITransactionsRepository,
    private accountsRepository: IAccountsRepository
  ) {}

  async handle({
    value,
    description,
    type = "debit",
    accountId,
    receiverAccountId,
  }: CreateInternalTransactionServiceRequest): Promise<CreateInternalTransactionServiceResponse> {
    const account = await this.accountsRepository.findAccountById(accountId)

    if (!account) {
      logger.error(`Account ${accountId} not found.`)
      throw new ResourceNotFoundError("Account not found.")
    }

    const receiverAccount = await this.accountsRepository.findAccountById(
      receiverAccountId
    )

    if (!receiverAccount) {
      logger.error(`Receiver account ${receiverAccountId} not found.`)
      throw new ResourceNotFoundError("Receiver account not found.")
    }

    const transaction = await this.transactionsRepository.create({
      value,
      description,
      type,
      receiverAccountId,
      account: {
        connect: {
          id: account.id,
        },
      },
    })

    if (type === "debit") {
      const balance = account.balance - value
      const receiverBalance = receiverAccount.balance + value

      if (balance < 0) {
        logger.error(
          `Account ${accountId} does not have enough balance to make this transaction.`
        )
        throw new Error("Account does not have enough balance.")
      }

      await this.accountsRepository.updateBalance(accountId, balance)
      await this.accountsRepository.updateBalance(
        receiverAccountId,
        receiverBalance
      )
    }

    if (type === "credit") {
      const balance = account.balance + value
      const receiverBalance = receiverAccount.balance - value

      await this.accountsRepository.updateBalance(accountId, balance)
      await this.accountsRepository.updateBalance(
        receiverAccountId,
        receiverBalance
      )
    }

    logger.info(`Internal transaction ${transaction.id} created.`)

    return { transaction }
  }
}
