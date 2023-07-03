import { Prisma, User } from "@prisma/client"

export interface IUsersRepository {
  create: (data: Prisma.UserCreateInput) => Promise<User>
  findByDocument: (document: string) => Promise<User | null>
}
