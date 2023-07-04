import { Router } from "express"

import { authMiddleware } from "@/middlewares/auth.middleware"

import { RegisterController } from "@/controllers/auth/register.controller"
import { LoginController } from "@/controllers/auth/login.controller"

import { CreateAccountController } from "@/controllers/account/createAccount.controller"
import { ListAccountsController } from "@/controllers/account/listAccounts.controller"

const routes = Router()

routes.post("/people", new RegisterController().register)
routes.post("/login", new LoginController().login)

routes.use(authMiddleware)

routes.post("/accounts", new CreateAccountController().create)
routes.get("/accounts", new ListAccountsController().list)

export { routes }
