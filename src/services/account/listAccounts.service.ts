import { IAccountsRepository } from "@/repositories/accounts.repository"
import { logger } from "@/lib/logger"

export class ListAccountsService {
  constructor(private accountsRepository: IAccountsRepository) {}

  async handle() {
    const accounts = await this.accountsRepository.findAllAccounts()

    logger.info("Accounts listed successfully.")

    return {
      accounts,
    }
  }
}
