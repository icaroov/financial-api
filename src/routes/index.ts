import { Router } from "express"

import { RegisterController } from "@/controllers/auth/register.controller"
import { LoginController } from "@/controllers/auth/login.controller"
import { authMiddleware } from "@/middlewares/auth.middleware"

const routes = Router()

routes.post("/people", new RegisterController().register)
routes.post("/login", new LoginController().login)

routes.use(authMiddleware)

export { routes }
