import { Prisma } from "@prisma/client"

import prisma from "@/lib/database"

import { IUsersRepository } from "../users.repository"

export class PrismaUsersRepository implements IUsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({ data })

    return user
  }

  async findByDocument(document: string) {
    const user = await prisma.user.findUnique({ where: { document } })

    return user
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({ where: { id } })

    return user
  }
}
