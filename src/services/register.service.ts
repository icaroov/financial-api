import bcrypt from "bcryptjs"

import { IUsersRepository } from "@/repositories/users.repository"
import { DocumentStatus } from "@/types/compliance.type"
import { logger } from "@/lib/logger"
import {
  InvalidDocumentError,
  UserAlreadyExistsError,
} from "@/helpers/errors.helper"

import { ComplianceService } from "./compliance.service"

interface IRegisterService {
  name: string
  document: string
  password: string
}

export class RegisterService {
  constructor(private usersRepository: IUsersRepository) {}

  async handle({ name, document, password }: IRegisterService) {
    const formattedDocument = document.replace(/\.|-|\//g, "")

    const userAlreadyExists = await this.usersRepository.findByDocument(
      formattedDocument
    )

    if (userAlreadyExists) {
      logger.error(`User with document: ${document} already exists.`)
      throw new UserAlreadyExistsError("User already exists.")
    }

    const complianceService = new ComplianceService()
    const isDocumentValid = await complianceService.validateDocument(
      formattedDocument
    )

    if (isDocumentValid === DocumentStatus.INVALID) {
      logger.error(`Invalid document: ${document}.`)
      throw new InvalidDocumentError("Invalid document.")
    }

    logger.info(`Validated document: ${document} successfully.`)

    const passwordHash = await bcrypt.hash(password, 6)

    await this.usersRepository.create({
      name,
      document: formattedDocument,
      password: passwordHash,
    })
  }
}
