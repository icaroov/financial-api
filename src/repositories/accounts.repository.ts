import { Account, Card, Prisma } from "@prisma/client"

export interface IAccountsRepository {
  create: (data: Prisma.AccountCreateInput) => Promise<Account>
  createCard: (data: Prisma.CardCreateInput) => Promise<Card>
  findAllAccounts: () => Promise<Account[]>
  findAccountById: (accountId: string) => Promise<Account | null>
  findByAccountNumber: (accountNumber: string) => Promise<Account | null>
  findCardsByAccountId: (accountId: string) => Promise<Card[]>
}
