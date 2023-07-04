import { Prisma } from "@prisma/client"

import prisma from "@/lib/database"
import { IAccountsRepository } from "@/repositories/accounts.repository"

export class PrismaAccountsRepository implements IAccountsRepository {
  async create(data: Prisma.AccountCreateInput) {
    const account = await prisma.account.create({ data })

    return account
  }

  async findAccountById(accountId: string) {
    const account = await prisma.account.findUnique({
      where: { id: accountId },
      include: { cards: true },
    })

    return account
  }

  async findAccountByNumber(accountNumber: string) {
    const account = await prisma.account.findUnique({
      where: { account: accountNumber },
    })

    return account
  }

  async findAllAccounts() {
    const accounts = await prisma.account.findMany()

    return accounts
  }
}
