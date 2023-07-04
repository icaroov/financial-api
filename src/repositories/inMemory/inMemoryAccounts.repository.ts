import { Account, Card, Prisma } from "@prisma/client"

import { IAccountsRepository } from "@/repositories/accounts.repository"

export class InMemoryAccountsRepository implements IAccountsRepository {
  public accounts: Account[] = []
  public cards: Card[] = []

  async create(data: Prisma.AccountCreateInput) {
    const formattedAccountNumber = data.account.replace("-", "")

    const account: Account = {
      id: String(this.accounts.length + 1),
      balance: 0,
      branch: data.branch,
      account: formattedAccountNumber,
      userId: data.user.connect?.id ?? "",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.accounts.push(account)

    return account
  }

  async findAccountById(accountId: string) {
    const account = this.accounts.find(account => account.id === accountId)

    if (!account) return null

    return account
  }

  async findByAccountNumber(accountNumber: string) {
    const account = this.accounts.find(
      account => account.account === accountNumber
    )

    if (!account) return null

    return account
  }

  async findAllAccounts() {
    return this.accounts
  }

  async createCard(data: Prisma.CardCreateInput) {
    const card: Card = {
      id: String(this.accounts.length + 1),
      type: data.type,
      cvv: data.cvv,
      number: data.number,
      accountId: data.account.connect?.id ?? "",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    return card
  }

  async findCardsByAccountId(accountId: string) {
    const cards = this.cards.filter(card => card.accountId === accountId)

    return cards
  }
}
