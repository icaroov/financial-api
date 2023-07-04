import bcrypt from "bcryptjs"

import { InMemoryAccountsRepository } from "@/repositories/inMemory/inMemoryAccounts.repository"
import { InMemoryUsersRepository } from "@/repositories/inMemory/inMemoryUsers.repository"
import { CreateAccountService } from "@/services/account/createAccount.service"

let usersRepository: InMemoryUsersRepository
let accountsRepository: InMemoryAccountsRepository

describe("CreateAccountService", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    accountsRepository = new InMemoryAccountsRepository()
  })

  it("should create an account", async () => {
    const createAccountService = new CreateAccountService(
      accountsRepository,
      usersRepository
    )

    const user = await usersRepository.create({
      name: "John Doe",
      document: "12345678900",
      password: await bcrypt.hash("123456", 6),
    })

    const { account } = await createAccountService.handle({
      branch: "001",
      account: "2033392-5",
      userId: user.id,
    })

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.balance).toBe(0)
    expect(account.userId).toBe(user.id)
  })

  it("should not create an account if user does not exist", async () => {
    const createAccountService = new CreateAccountService(
      accountsRepository,
      usersRepository
    )

    const handler = createAccountService.handle({
      branch: "001",
      account: "2033392-5",
      userId: "invalid-user-id",
    })

    expect(() => handler).rejects.toThrow("User not found.")
  })

  it("should format account number", async () => {
    const createAccountService = new CreateAccountService(
      accountsRepository,
      usersRepository
    )

    const user = await usersRepository.create({
      name: "John Doe",
      document: "12345678900",
      password: await bcrypt.hash("123456", 6),
    })

    const { account } = await createAccountService.handle({
      branch: "001",
      account: "2033392-5",
      userId: user.id,
    })

    expect(account.account).toBe("20333925")
  })

  it("should not create an account if account already exists", async () => {
    const createAccountService = new CreateAccountService(
      accountsRepository,
      usersRepository
    )

    const user = await usersRepository.create({
      name: "John Doe",
      document: "12345678900",
      password: await bcrypt.hash("123456", 6),
    })

    await accountsRepository.create({
      branch: "001",
      account: "2033392-5",
      balance: 0,
      user: {
        connect: {
          id: user.id,
        },
      },
    })

    const handler = createAccountService.handle({
      branch: "001",
      account: "20333925",
      userId: user.id,
    })

    expect(() => handler).rejects.toThrow("Account already exists.")
  })
})
