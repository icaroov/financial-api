import { createAccount } from "@/mocks/createAccount"
import { createUser } from "@/mocks/createUser"

import { InMemoryAccountsRepository } from "@/repositories/inMemory/inMemoryAccounts.repository"
import { InMemoryCardsRepository } from "@/repositories/inMemory/inMemoryCards.repository"
import { InMemoryUsersRepository } from "@/repositories/inMemory/inMemoryUsers.repository"
import { CreateCardForAccountService } from "@/services/card/createCardForAccount.service"

let accountsRepository: InMemoryAccountsRepository
let usersRepository: InMemoryUsersRepository
let cardsRepository: InMemoryCardsRepository
let createCardForAccountService: CreateCardForAccountService

describe("ListCardsByAccountService", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    accountsRepository = new InMemoryAccountsRepository()
    cardsRepository = new InMemoryCardsRepository()

    createCardForAccountService = new CreateCardForAccountService(
      cardsRepository,
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

    const cards = await cardsRepository.findCardsByAccountId(account.id)

    expect(cards).toHaveLength(1)
  })
})
