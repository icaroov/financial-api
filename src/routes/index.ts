import { Router } from "express"

import { authMiddleware } from "@/middlewares/auth.middleware"

import { RegisterController } from "@/controllers/auth/register.controller"
import { LoginController } from "@/controllers/auth/login.controller"

import { CreateAccountController } from "@/controllers/account/createAccount.controller"
import { ListAccountsController } from "@/controllers/account/listAccounts.controller"
import { CreateCardForAccountController } from "@/controllers/card/createCardForAccount.controller"

import { ListCardsByAccountController } from "@/controllers/card/listCardsByAccount.controller"
import { ListCardsByUserController } from "@/controllers/card/listCardsByUser.controller"

import { CreateTransactionController } from "@/controllers/transaction/createTransaction.controller"
import { CreateInternalTransactionController } from "@/controllers/transaction/createInternalTransaction.controller"
import { ListTransactionsByAccountController } from "@/controllers/transaction/listTransactionsByAccount.controller"

const routes = Router()

routes.post("/people", new RegisterController().register)
routes.post("/login", new LoginController().login)

routes.use(authMiddleware)

routes.post("/accounts", new CreateAccountController().create)
routes.get("/accounts", new ListAccountsController().list)

routes.get("/cards", new ListCardsByUserController().list)
routes.post(
  "/accounts/:accountId/cards",
  new CreateCardForAccountController().create
)
routes.get(
  "/accounts/:accountId/cards",
  new ListCardsByAccountController().list
)

routes.get(
  "/accounts/:accountId/transactions",
  new ListTransactionsByAccountController().list
)
routes.post(
  "/accounts/:accountId/transactions",
  new CreateTransactionController().create
)
routes.post(
  "/accounts/:accountId/transactions/internal",
  new CreateInternalTransactionController().create
)

export { routes }
