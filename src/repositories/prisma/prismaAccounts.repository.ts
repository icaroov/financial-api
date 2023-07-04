import { Prisma } from "@prisma/client"

import prisma from "@/lib/database"
import { IAccountsRepository } from "@/repositories/accounts.repository"

export class PrismaAccountsRepository implements IAccountsRepository {
  async create(data: Prisma.AccountCreateInput) {
    const account = await prisma.account.create({ data })

    return account
  }

  async createCard(data: Prisma.CardCreateInput) {
    const card = await prisma.card.create({ data })

    return card
  }

  async findAccountById(accountId: string) {
    const account = await prisma.account.findUnique({
      where: { id: accountId },
    })

    return account
  }

  async findByAccountNumber(accountNumber: string) {
    const account = await prisma.account.findUnique({
      where: { account: accountNumber },
    })

    return account
  }

  async findAllAccounts() {
    const accounts = await prisma.account.findMany()

    return accounts
  }

  async findCardsByAccountId(accountId: string) {
    const cards = await prisma.card.findMany({
      where: { accountId },
    })

    return cards
  }
}
