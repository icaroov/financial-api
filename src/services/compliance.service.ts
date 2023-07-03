import axios, { AxiosError, AxiosInstance } from "axios"

import { env } from "@/lib/env"
import { logger } from "@/lib/logger"
import {
  AuthCodeResponse,
  AuthTokenResponse,
  DocumentStatus,
  RefreshTokenResponse,
  ValidateDocumentResponse,
} from "@/types/compliance.type"

export class ComplianceService {
  private url = env.COMPLIANCE_API_URL
  private accessToken: string | undefined
  private refreshToken: string | undefined

  private axiosInstance: AxiosInstance

  constructor() {
    this.axiosInstance = axios.create()
  }

  async validateDocument(document: string): Promise<DocumentStatus> {
    if (!this.accessToken) {
      await this.refreshAccessToken()
    }

    const documentType = document.length === 11 ? "cpf" : "cnpj"

    try {
      const response = await this.axiosInstance.post<ValidateDocumentResponse>(
        `${this.url}/${documentType}/validate`,
        {
          document: document,
        }
      )

      return response.data.status
    } catch (error) {
      // If the request fails with an unauthorized error, try refreshing the access token
      if (
        error instanceof AxiosError &&
        error.response &&
        error.response.status === 401
      ) {
        await this.refreshAccessToken()

        return this.validateDocument(document)
      }

      throw error
    }
  }

  private async getAuthCode() {
    const authCodeResponse = await axios.post<AuthCodeResponse>(
      `${this.url}/auth/code`,
      {
        email: env.COMPLIANCE_EMAIL,
        password: env.COMPLIANCE_PASSWORD,
      }
    )

    const authCode = authCodeResponse.data.data.authCode

    if (!authCode) {
      const message = "Compliance API did not return an auth code."

      logger.error(message)
      throw new Error(message)
    }

    logger.info("Obtained auth code from Compliance API.")

    return authCode
  }

  private async getAccessAndRefreshToken() {
    const authCode = await this.getAuthCode()

    const response = await axios.post<AuthTokenResponse>(
      `${this.url}/auth/token`,
      {
        authCode,
      }
    )

    const { accessToken, refreshToken } = response.data.data

    if (!accessToken || !refreshToken) {
      const message = "Compliance API did not return an access token."

      logger.error(message)
      throw new Error(message)
    }

    logger.info("Obtained access and refresh tokens from Compliance API.")

    return { accessToken, refreshToken }
  }

  private async refreshAccessToken() {
    if (!this.refreshToken) {
      const { accessToken, refreshToken } =
        await this.getAccessAndRefreshToken()

      this.accessToken = accessToken
      this.refreshToken = refreshToken
    } else {
      const response = await axios.post<RefreshTokenResponse>(
        `${this.url}/auth/refresh`,
        {
          refreshToken: this.refreshToken,
        }
      )

      if (!response.data.data.accessToken) {
        const message =
          "Compliance API did not return an access token when refreshing."

        logger.error(message)
        throw new Error(message)
      }

      this.accessToken = response.data.data.accessToken
    }

    logger.info("Refreshed access token from Compliance API.")

    // Update the Authorization header of the axios instance with the new access token
    this.axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${this.accessToken}`
  }
}
