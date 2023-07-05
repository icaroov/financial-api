import { IAccountsRepository } from "@/repositories/accounts.repository"
import { ResourceNotFoundError } from "@/helpers/errors.helper"
import { logger } from "@/lib/logger"

interface GetAccountBalanceServiceRequest {
  accountId: string
}

interface GetAccountBalanceServiceResponse {
  balance: number
}

export class GetAccountBalanceService {
  constructor(private accountsRepository: IAccountsRepository) {}

  async handle({
    accountId,
  }: GetAccountBalanceServiceRequest): Promise<GetAccountBalanceServiceResponse> {
    const account = await this.accountsRepository.findAccountById(accountId)

    if (!account) {
      logger.error("Account not found.")
      throw new ResourceNotFoundError("Account not found.")
    }

    const balance = await this.accountsRepository.getBalanceByAccountId(
      accountId
    )

    logger.info("Account balance retrieved successfully.")

    return { balance }
  }
}
