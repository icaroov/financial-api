import { Account, Prisma } from "@prisma/client"

import { IAccountsRepository } from "@/repositories/accounts.repository"

export class InMemoryAccountsRepository implements IAccountsRepository {
  public accounts: Account[] = []

  async create(data: Prisma.AccountCreateInput) {
    const account: Account = {
      id: String(this.accounts.length + 1),
      balance: 0,
      branch: data.branch,
      account: data.account,
      userId: data.user.connect?.id ?? "",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.accounts.push(account)

    return account
  }

  async findById(id: string) {
    const account = this.accounts.find(account => account.id === id)

    if (!account) return null

    return account
  }

  async findAll() {
    return this.accounts
  }
}
