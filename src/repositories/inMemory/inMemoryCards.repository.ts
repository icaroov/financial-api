import { Card, Prisma } from "@prisma/client"

import { createAccount } from "@/mocks/createAccount"
import { ICardsRepository } from "@/repositories/cards.repository"
import { InMemoryAccountsRepository } from "./inMemoryAccounts.repository"

export class InMemoryCardsRepository implements ICardsRepository {
  public cards: Card[] = []

  async createCard(data: Prisma.CardCreateInput) {
    const card: Card = {
      id: String(this.cards.length + 1),
      type: data.type,
      cvv: data.cvv,
      number: data.number,
      accountId: data.account.connect?.id ?? "",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.cards.push(card)

    return card
  }

  async findCardsByAccountId(accountId: string) {
    const cards = this.cards.filter(card => card.accountId === accountId)

    return cards
  }

  async findCardsByUserId(userId: string) {
    const accountsRepository = new InMemoryAccountsRepository()

    await createAccount(accountsRepository, userId)

    const cards = this.cards.filter(card => {
      const account = accountsRepository.accounts.find(
        account => account.id === card.accountId
      )

      return account?.userId === userId
    })

    return cards
  }
}
