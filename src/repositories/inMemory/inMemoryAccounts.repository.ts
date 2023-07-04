import { Account, Prisma } from "@prisma/client"

import { IAccountsRepository } from "@/repositories/accounts.repository"

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

  async findByAccountNumber(accountNumber: string) {
    const account = this.accounts.find(
      account => account.account === accountNumber
    )

    if (!account) return null

    return account
  }

  async findAll() {
    return this.accounts
  }
}
