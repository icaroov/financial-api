import { createAccount } from "@/mocks/createAccount"
import { createUser } from "@/mocks/createUser"

import { InMemoryAccountsRepository } from "@/repositories/inMemory/inMemoryAccounts.repository"
import { InMemoryUsersRepository } from "@/repositories/inMemory/inMemoryUsers.repository"
import { CreateCardForAccountService } from "@/services/account/createCardForAccount.service"

let accountsRepository: InMemoryAccountsRepository
let usersRepository: InMemoryUsersRepository
let createCardForAccountService: CreateCardForAccountService

describe("ListCardsByAccountService", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    accountsRepository = new InMemoryAccountsRepository()
    createCardForAccountService = new CreateCardForAccountService(
      accountsRepository
    )
  })

  it("should list all cards by account", async () => {
    const user = await createUser(usersRepository)
    const account = await createAccount(accountsRepository, user.id)

    await createCardForAccountService.handle({
      accountId: account.id,
      cvv: "123",
      number: "1234567890123456",
      type: "physical",
    })

    const cards = await accountsRepository.findCardsByAccountId(account.id)

    expect(cards).toHaveLength(1)
  })
})
