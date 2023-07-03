import { Router } from "express"

import { register } from "@/controllers/register.controller"

const routes = Router()

routes.post("/people", register)

export { routes }
