import { Router } from "express"

import { RegisterController } from "@/controllers/register.controller"

const routes = Router()

routes.post("/people", new RegisterController().create)

export { routes }
