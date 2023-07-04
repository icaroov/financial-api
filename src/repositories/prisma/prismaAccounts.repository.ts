import { Prisma } from "@prisma/client"

import prisma from "@/lib/database"
import { IAccountsRepository } from "@/repositories/accounts.repository"

export class PrismaAccountsRepository implements IAccountsRepository {
  async create(data: Prisma.AccountCreateInput) {
    const account = await prisma.account.create({ data })

    return account
  }

  async findByAccountNumber(accountNumber: string) {
    const account = await prisma.account.findUnique({
      where: { account: accountNumber },
    })

    return account
  }

  async findAll() {
    const accounts = await prisma.account.findMany()

    return accounts
  }
}