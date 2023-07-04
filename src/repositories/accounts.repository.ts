import { Account, Prisma } from "@prisma/client"

export interface IAccountsRepository {
  create: (data: Prisma.AccountCreateInput) => Promise<Account>
  findById: (id: string) => Promise<Account | null>
  findAll: () => Promise<Account[]>
}
