import { Account, Card, Prisma } from "@prisma/client"

export interface IAccountsRepository {
  create: (data: Prisma.AccountCreateInput) => Promise<Account>
  findAllAccounts: () => Promise<Account[]>
  findAccountByNumber: (accountNumber: string) => Promise<Account | null>
  findAccountById: (
    accountId: string
  ) => Promise<(Account & { cards: Card[] }) | null>

  createCard: (data: Prisma.CardCreateInput) => Promise<Card>
  findCardsByAccountId: (accountId: string) => Promise<Card[]>
}
