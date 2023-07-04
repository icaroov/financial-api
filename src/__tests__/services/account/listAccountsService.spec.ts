import bcrypt from "bcryptjs"

import { InMemoryAccountsRepository } from "@/repositories/inMemory/inMemoryAccounts.repository"
import { InMemoryUsersRepository } from "@/repositories/inMemory/inMemoryUsers.repository"
import { CreateAccountService } from "@/services/account/createAccount.service"

let accountsRepository: InMemoryAccountsRepository
let usersRepository: InMemoryUsersRepository

describe("ListAccountsService", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    accountsRepository = new InMemoryAccountsRepository()
  })

  it("should list all accounts", async () => {
    const createAccountService = new CreateAccountService(
      accountsRepository,
      usersRepository
    )

    const user = await usersRepository.create({
      name: "John Doe",
      document: "12345678900",
      password: await bcrypt.hash("123456", 6),
    })

    await createAccountService.handle({
      branch: "001",
      account: "2033392-5",
      userId: user.id,
    })

    const accounts = await accountsRepository.findAllAccounts()

    expect(accounts).toHaveLength(1)
  })
})
