import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

import { env } from "@/lib/env"
import { UnauthorizedError } from "@/helpers/errors.helper"
import { PrismaUsersRepository } from "@/repositories/prisma/prismaUsers.repository"

export const authMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers

  if (!authorization) {
    throw new UnauthorizedError("Unauthorized.")
  }

  const token = authorization.split(" ")[1]

  const { id } = jwt.verify(token, env.JWT_SECRET) as { id: string }

  const usersRepository = new PrismaUsersRepository()

  const user = await usersRepository.findById(id)

  if (!user) {
    throw new UnauthorizedError("Unauthorized.")
  }

  const { password: _, ...userWithoutPassword } = user

  req.user = userWithoutPassword

  next()
}
