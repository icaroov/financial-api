import { Prisma, User } from "@prisma/client"

import { IUsersRepository } from "../users.repository"

export class InMemoryUsersRepository implements IUsersRepository {
  public users: User[] = []

  async create(data: Prisma.UserCreateInput) {
    const user: User = {
      id: String(this.users.length + 1),
      name: data.name,
      document: data.document,
      password: data.password,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.users.push(user)

    return user
  }

  async findByDocument(document: string) {
    const user = this.users.find(user => user.document === document)

    if (!user) return null

    return user
  }

  async findById(id: string) {
    const user = this.users.find(user => user.id === id)

    if (!user) return null

    return user
  }
}
