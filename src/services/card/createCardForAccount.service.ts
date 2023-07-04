import { Account, Card } from "@prisma/client"

import { logger } from "@/lib/logger"
import { IAccountsRepository } from "@/repositories/accounts.repository"
import {
  ResourceAlreadyExistsError,
  ResourceNotFoundError,
} from "@/helpers/errors.helper"
import { ICardsRepository } from "@/repositories/cards.repository"

interface CreateCardForAccountServiceRequest {
  cvv: string
  type: Card["type"]
  number: string
  accountId: Account["id"]
}

interface CreateCardForAccountServiceResponse {
  card: Card
}

export class CreateCardForAccountService {
  constructor(
    private cardsRepository: ICardsRepository,
    private accountsRepository: IAccountsRepository
  ) {}

  async handle({
    cvv,
    type,
    number: cardNumber,
    accountId,
  }: CreateCardForAccountServiceRequest): Promise<CreateCardForAccountServiceResponse> {
    const accountAlreadyExists = await this.accountsRepository.findAccountById(
      accountId
    )

    if (!accountAlreadyExists) {
      logger.error(`Account ${cardNumber} not found.`)
      throw new ResourceNotFoundError("Account not found.")
    }

    const cards = await this.cardsRepository.findCardsByAccountId(accountId)
    const cardAlreadyExists = cards.find(card => card.number === cardNumber)

    if (cardAlreadyExists) {
      logger.error(`Card already exists for account ${accountId}.`)
      throw new ResourceAlreadyExistsError("Card already exists in account.")
    }

    const card = await this.cardsRepository.createCard({
      type,
      number: cardNumber,
      cvv,
      account: {
        connect: {
          id: accountId,
        },
      },
    })

    logger.info(
      `Created card associated with account ${accountAlreadyExists.account}.`
    )

    return { card }
  }
}
