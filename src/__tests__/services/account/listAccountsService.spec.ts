import { createUser } from "@/mocks/createUser"

import { InMemoryAccountsRepository } from "@/repositories/inMemory/inMemoryAccounts.repository"
import { InMemoryUsersRepository } from "@/repositories/inMemory/inMemoryUsers.repository"
import { CreateAccountService } from "@/services/account/createAccount.service"

let accountsRepository: InMemoryAccountsRepository
let usersRepository: InMemoryUsersRepository
let createAccountService: CreateAccountService

describe("ListAccountsService", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    accountsRepository = new InMemoryAccountsRepository()
    createAccountService = new CreateAccountService(
      accountsRepository,
      usersRepository
    )
  })

  it("should list all accounts", async () => {
    const user = await createUser(usersRepository)

    await createAccountService.handle({
      branch: "001",
      account: "2033392-5",
      userId: user.id,
    })

    const accounts = await accountsRepository.findAllAccounts()

    expect(accounts).toHaveLength(1)
  })
})
