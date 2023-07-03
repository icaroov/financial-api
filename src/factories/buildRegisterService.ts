import { PrismaUsersRepository } from "@/repositories/prisma/prismaUsers.repository"
import { ComplianceService } from "@/services/compliance.service"
import { RegisterService } from "@/services/auth/register.service"

export const buildRegisterService = () => {
  const usersRepository = new PrismaUsersRepository()
  const complianceService = new ComplianceService()

  const registerService = new RegisterService(
    usersRepository,
    complianceService
  )

  return registerService
}
