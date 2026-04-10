export interface AuthCodeDto {
  authCode?: string
  authValue: string
  serviceName: string
}

export interface TokenPair {
  accessToken: string
  refreshToken: string
}

export type AuthType = 'Sms' | 'Email' | 'Call'
