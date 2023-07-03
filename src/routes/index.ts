import { Router } from "express"

import { RegisterController } from "@/controllers/auth/register.controller"
import { LoginController } from "@/controllers/auth/login.controller"

const routes = Router()

routes.post("/people", new RegisterController().register)
routes.post("/login", new LoginController().login)

export { routes }
