import bcrypt from "bcryptjs"

import { InMemoryUsersRepository } from "@/repositories/inMemory/inMemoryUsers.repository"
import { RegisterService } from "@/services/register.service"
import { DocumentStatus } from "@/types/compliance.type"

describe("RegisterService", () => {
  it("should hash the password correctly", async () => {
    const usersRepository = new InMemoryUsersRepository()
    const complianceServiceMocked = {
      validateDocument: jest.fn().mockResolvedValue(DocumentStatus.VALID),
    }

    const registerService = new RegisterService(
      usersRepository,
      complianceServiceMocked
    )

    const { user } = await registerService.handle({
      name: "John Doe",
      document: "123.456.789-00",
      password: "123456",
    })

    const isPasswordHashed = await bcrypt.compare("123456", user.password)

    expect(isPasswordHashed).toBe(true)
  })

  it("should throw an error if the document is invalid", async () => {
    const usersRepository = new InMemoryUsersRepository()
    const complianceServiceMocked = {
      validateDocument: jest.fn().mockResolvedValue(DocumentStatus.INVALID),
    }

    const registerService = new RegisterService(
      usersRepository,
      complianceServiceMocked
    )

    const handler = registerService.handle({
      name: "John Doe",
      document: "123.456.789-00",
      password: "123456",
    })

    await expect(() => handler).rejects.toThrow("Invalid document.")
    expect(complianceServiceMocked.validateDocument).toHaveBeenCalledTimes(1)
    expect(complianceServiceMocked.validateDocument).toHaveBeenCalledWith(
      "12345678900"
    )
  })

  it("should throw an error if the user already exists", async () => {
    const usersRepository = new InMemoryUsersRepository()
    const complianceServiceMocked = {
      validateDocument: jest.fn().mockResolvedValue(DocumentStatus.VALID),
    }

    const registerService = new RegisterService(
      usersRepository,
      complianceServiceMocked
    )

    await registerService.handle({
      name: "John Doe",
      document: "123.456.789-00",
      password: "123456",
    })

    const handler = registerService.handle({
      name: "John Doe",
      document: "123.456.789-00",
      password: "123456",
    })

    await expect(() => handler).rejects.toThrow("User already exists.")
  })

  it("should create a new user", async () => {
    const usersRepository = new InMemoryUsersRepository()
    const complianceServiceMocked = {
      validateDocument: jest.fn().mockResolvedValue(DocumentStatus.VALID),
    }

    const registerService = new RegisterService(
      usersRepository,
      complianceServiceMocked
    )

    const { user } = await registerService.handle({
      name: "John Doe",
      document: "123.456.789-00",
      password: "123456",
    })

    expect(user).toHaveProperty("id")
    expect(user).toHaveProperty("name", "John Doe")
    expect(user).toHaveProperty("document", "12345678900")
    expect(user).toHaveProperty("password")
    expect(user).toHaveProperty("createdAt")
    expect(user).toHaveProperty("updatedAt")
  })
})
