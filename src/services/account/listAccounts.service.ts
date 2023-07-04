import { IAccountsRepository } from "@/repositories/accounts.repository"
import { logger } from "@/lib/logger"

export class ListAccountsService {
  constructor(private accountsRepository: IAccountsRepository) {}

  async handle() {
    const accounts = await this.accountsRepository.findAll()

    logger.info("Accounts listed successfully.")

    return {
      accounts,
    }
  }
}
