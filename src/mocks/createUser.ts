import bcrypt from "bcryptjs"

import { IUsersRepository } from "@/repositories/users.repository"

export const createUser = async (usersRepository: IUsersRepository) => {
  const user = await usersRepository.create({
    name: "John Doe",
    document: "12345678900",
    password: await bcrypt.hash("123456", 6),
  })

  return user
}
