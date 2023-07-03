import bcrypt from "bcryptjs"

import { InMemoryUsersRepository } from "@/repositories/inMemory/inMemoryUsers.repository"
import { InvalidCredentialsError } from "@/helpers/errors.helper"
import { LoginService } from "@/services/auth/login.service"

let usersRepository: InMemoryUsersRepository
let loginService: LoginService

describe("AuthService", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    loginService = new LoginService(usersRepository)
  })

  it("should be able to authenticate a user", async () => {
    await usersRepository.create({
      name: "John Doe",
      document: "12345678900",
      password: await bcrypt.hash("123456", 6),
    })

    const { token } = await loginService.handle({
      document: "12345678900",
      password: "123456",
    })

    expect(token).toBeTruthy()
  })

  it("should not be able to authenticate a user with invalid document", async () => {
    const handler = loginService.handle({
      document: "12345678900",
      password: "123456",
    })

    expect(() => handler).rejects.toBeInstanceOf(InvalidCredentialsError)
    expect(() => handler).rejects.toThrow("Invalid credentials.")
  })

  it("should not be able to authenticate a user with invalid password", async () => {
    await usersRepository.create({
      name: "John Doe",
      document: "12345678900",
      password: await bcrypt.hash("123456", 6),
    })

    const handler = loginService.handle({
      document: "12345678900",
      password: "123456789",
    })

    expect(() => handler).rejects.toBeInstanceOf(InvalidCredentialsError)
    await expect(() => handler).rejects.toThrow("Invalid credentials.")
  })
})
