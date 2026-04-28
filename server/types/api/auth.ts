export interface AuthCodeDto {
  authCode?: string
  authValue: string
  serviceName: string
}

export interface TokenPair {
  accessToken: string
  refreshToken: string
}

export interface RegisteredUser {
  tokens: TokenPair
  userId: number
}

export interface UserIdTokenDto {
  token: string
  userId?: number
}

export interface AuthValueBase {
  type: AuthValueType
  value: string
}

export interface AuthValueDto {
  authValue: string
  serviceName: string
}

export interface TokenDto {
  token: string
}

export interface TokenPasswordDto {
  password: string
  token: string
}

export interface TokenServiceDto {
  serviceName: string
  token: string
}

export interface TokenAuthValueDto {
  authValue: string
  serviceName: string
  token: string
}

export type AuthType = 'Sms' | 'Email' | 'Call'
export type AuthValueType = 'Phone' | 'Email'
