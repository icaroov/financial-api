import { Account, Prisma } from "@prisma/client"

export interface IAccountsRepository {
  create: (data: Prisma.AccountCreateInput) => Promise<Account>
  findByAccountNumber: (accountNumber: string) => Promise<Account | null>
  findAll: () => Promise<Account[]>
}
