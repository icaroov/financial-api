import { PrismaUsersRepository } from "@/repositories/prisma/prismaUsers.repository"
import { LoginService } from "@/services/auth/login.service"

export const buildLoginService = () => {
  const usersRepository = new PrismaUsersRepository()

  const authService = new LoginService(usersRepository)

  return authService
}
