export type AuthCodeResponse = {
  success: boolean
  data: {
    userId: string
    authCode: string
  }
}

export type AuthTokenResponse = {
  success: boolean
  data: {
    idToken: string
    accessToken: string
    refreshToken: string
  }
}

export type RefreshTokenResponse = {
  success: boolean
  data: {
    accessToken: string
  }
}

export enum DocumentStatus {
  VALID = 1,
  INVALID = 2,
}

export type ValidateDocumentResponse = {
  document: string
  status: DocumentStatus
  reason: string
}
