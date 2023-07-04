import { Router } from "express"

import { authMiddleware } from "@/middlewares/auth.middleware"

import { RegisterController } from "@/controllers/auth/register.controller"
import { LoginController } from "@/controllers/auth/login.controller"

import { CreateAccountController } from "@/controllers/account/createAccount.controller"
import { ListAccountsController } from "@/controllers/account/listAccounts.controller"
import { CreateCardForAccountController } from "@/controllers/card/createCardForAccount.controller"
import { ListCardsByAccountController } from "@/controllers/card/listCardsByAccount.controller"

const routes = Router()

routes.post("/people", new RegisterController().register)
routes.post("/login", new LoginController().login)

routes.use(authMiddleware)

routes.post("/accounts", new CreateAccountController().create)
routes.get("/accounts", new ListAccountsController().list)
routes.post(
  "/accounts/:accountId/cards",
  new CreateCardForAccountController().create
)
routes.get(
  "/accounts/:accountId/cards",
  new ListCardsByAccountController().list
)

export { routes }
