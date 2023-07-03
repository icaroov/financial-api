import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { User } from "@prisma/client"

import { InvalidCredentialsError } from "@/helpers/errors.helper"
import { IUsersRepository } from "@/repositories/users.repository"
import { logger } from "@/lib/logger"
import { env } from "@/lib/env"

interface LoginServiceRequest {
  document: string
  password: string
}

interface LoginServiceResponse {
  user: User
  token: string
}

export class LoginService {
  constructor(private usersRepository: IUsersRepository) {}

  async handle({
    document,
    password,
  }: LoginServiceRequest): Promise<LoginServiceResponse> {
    const user = await this.usersRepository.findByDocument(document)

    if (!user) {
      throw new InvalidCredentialsError("Invalid credentials.")
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      throw new InvalidCredentialsError("Invalid credentials.")
    }

    const token = jwt.sign({ id: user.id }, env.JWT_SECRET, {
      expiresIn: "1d",
    })

    logger.info(`Token generated for user with document: ${document}.`)

    return { user, token }
  }
}
