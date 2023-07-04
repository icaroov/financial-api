import { IAccountsRepository } from "@/repositories/accounts.repository"
import { User } from "@prisma/client"

export const createAccount = async (
  accountsRepository: IAccountsRepository,
  userId: User["id"]
) => {
  const account = await accountsRepository.create({
    branch: "001",
    account: "2033392-5",
    balance: 0,
    user: {
      connect: {
        id: userId,
      },
    },
  })

  return account
}
