import { Account, Prisma } from "@prisma/client"

import { IAccountsRepository } from "@/repositories/accounts.repository"
import { InMemoryCardsRepository } from "./inMemoryCards.repository"

export class InMemoryAccountsRepository implements IAccountsRepository {
  public accounts: Account[] = []

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
    const cards = new InMemoryCardsRepository().cards

    const account = this.accounts.find(account => account.id === accountId)

    if (!account) return null

    return {
      ...account,
      cards: cards.filter(card => card.accountId === account.id),
    }
  }

  async findAccountByNumber(accountNumber: string) {
    const account = this.accounts.find(
      account => account.account === accountNumber
    )

    if (!account) return null

    return account
  }

  async findAllAccounts() {
    return this.accounts
  }
}
