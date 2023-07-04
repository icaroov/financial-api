import { createUser } from "@/mocks/createUser"
import { createAccount } from "@/mocks/createAccount"

import { InMemoryAccountsRepository } from "@/repositories/inMemory/inMemoryAccounts.repository"
import { InMemoryUsersRepository } from "@/repositories/inMemory/inMemoryUsers.repository"
import { CreateCardForAccountService } from "@/services/account/createCardForAccount.service"
import { ResourceNotFoundError } from "@/helpers/errors.helper"

let usersRepository: InMemoryUsersRepository
let accountsRepository: InMemoryAccountsRepository
let createCardForAccountService: CreateCardForAccountService

describe("CreateCardForAccountService", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    accountsRepository = new InMemoryAccountsRepository()
    createCardForAccountService = new CreateCardForAccountService(
      accountsRepository
    )
  })

  it("should create a card for an account", async () => {
    const user = await createUser(usersRepository)
    const account = await createAccount(accountsRepository, user.id)

    const { card } = await createCardForAccountService.handle({
      cvv: "123",
      type: "virtual",
      number: "1234567890123456",
      accountId: account.id,
    })

    expect(card).toBeTruthy()
    expect(card.id).toBeTruthy()
    expect(card.accountId).toBe(account.id)
    expect(card.type).toBe("virtual")
    expect(card.number).toBe("1234567890123456")
  })

  it("should not create a card if account does not exist", async () => {
    const handler = createCardForAccountService.handle({
      cvv: "123",
      type: "virtual",
      number: "1234567890123456",
      accountId: "invalid-account-id",
    })

    await expect(() => handler).rejects.toThrow("Account not found.")
    await expect(() => handler).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
