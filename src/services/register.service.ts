import bcrypt from "bcryptjs"

import { IUsersRepository } from "@/repositories/users.repository"
import { IComplianceRepository } from "@/repositories/compliance.repository"
import { User } from "@prisma/client"

import { DocumentStatus } from "@/types/compliance.type"
import { logger } from "@/lib/logger"
import {
  InvalidDocumentError,
  UserAlreadyExistsError,
} from "@/helpers/errors.helper"

interface IRegisterServiceRequest {
  name: string
  document: string
  password: string
}

interface IRegisterServiceResponse {
  user: User
}

export class RegisterService {
  constructor(
    private usersRepository: IUsersRepository,
    private complianceService: IComplianceRepository
  ) {}

  async handle({
    name,
    document,
    password,
  }: IRegisterServiceRequest): Promise<IRegisterServiceResponse> {
    const formattedDocument = document.replace(/\.|-|\//g, "")

    const userAlreadyExists = await this.usersRepository.findByDocument(
      formattedDocument
    )

    if (userAlreadyExists) {
      logger.error(`User with document: ${document} already exists.`)
      throw new UserAlreadyExistsError("User already exists.")
    }

    const isDocumentValid = await this.complianceService.validateDocument(
      formattedDocument
    )

    if (isDocumentValid === DocumentStatus.INVALID) {
      logger.error(`Invalid document: ${document}.`)
      throw new InvalidDocumentError("Invalid document.")
    }

    logger.info(`Validated document: ${document} successfully.`)

    const passwordHash = await bcrypt.hash(password, 6)

    const user = await this.usersRepository.create({
      name,
      document: formattedDocument,
      password: passwordHash,
    })

    return {
      user,
    }
  }
}
