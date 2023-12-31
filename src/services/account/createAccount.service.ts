import { Account, User } from "@prisma/client"

import { logger } from "@/lib/logger"
import { IAccountsRepository } from "@/repositories/accounts.repository"
import { IUsersRepository } from "@/repositories/users.repository"
import {
  ResourceAlreadyExistsError,
  ResourceNotFoundError,
} from "@/helpers/errors.helper"

interface CreateAccountServiceRequest {
  branch: string
  account: string
  userId: User["id"]
}

interface CreateAccountServiceResponse {
  account: Account
}

export class CreateAccountService {
  constructor(
    private accountsRepository: IAccountsRepository,
    private usersRepository: IUsersRepository
  ) {}

  async handle({
    account,
    branch,
    userId,
  }: CreateAccountServiceRequest): Promise<CreateAccountServiceResponse> {
    const formattedAccountNumber = account.replace("-", "")

    const accountAlreadyExists =
      await this.accountsRepository.findAccountByNumber(formattedAccountNumber)

    if (accountAlreadyExists) {
      logger.error("Account already exists.")
      throw new ResourceAlreadyExistsError("Account already exists.")
    }

    const user = await this.usersRepository.findById(userId)

    if (!user) {
      logger.error("User not found.")
      throw new ResourceNotFoundError("User not found.")
    }

    const newAccount = await this.accountsRepository.create({
      account: formattedAccountNumber,
      branch,
      balance: 0,
      user: {
        connect: {
          id: user.id,
        },
      },
    })

    logger.info("Account created successfully.")

    return {
      account: newAccount,
    }
  }
}
