import { createUser } from "@/mocks/createUser"
import { createAccount } from "@/mocks/createAccount"

import { InMemoryAccountsRepository } from "@/repositories/inMemory/inMemoryAccounts.repository"
import { InMemoryUsersRepository } from "@/repositories/inMemory/inMemoryUsers.repository"
import { CreateCardForAccountService } from "@/services/card/createCardForAccount.service"
import {
  ResourceAlreadyExistsError,
  ResourceNotFoundError,
} from "@/helpers/errors.helper"
import { InMemoryCardsRepository } from "@/repositories/inMemory/inMemoryCards.repository"

let usersRepository: InMemoryUsersRepository
let accountsRepository: InMemoryAccountsRepository
let createCardForAccountService: CreateCardForAccountService
let cardsRepository: InMemoryCardsRepository

describe("CreateCardForAccountService", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    accountsRepository = new InMemoryAccountsRepository()
    cardsRepository = new InMemoryCardsRepository()

    createCardForAccountService = new CreateCardForAccountService(
      cardsRepository,
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

  it("should not create a card already exists in specified account", async () => {
    const user = await createUser(usersRepository)
    const account = await createAccount(accountsRepository, user.id)

    const { card } = await createCardForAccountService.handle({
      cvv: "123",
      type: "virtual",
      number: "1234567890123456",
      accountId: account.id,
    })

    const handler = createCardForAccountService.handle({
      cvv: "123",
      type: "virtual",
      number: card.number,
      accountId: account.id,
    })

    await expect(() => handler).rejects.toThrow(
      "Card already exists in account."
    )
    await expect(() => handler).rejects.toBeInstanceOf(
      ResourceAlreadyExistsError
    )
  })
})
