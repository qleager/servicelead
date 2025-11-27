export interface EmailDto {
  email: string
  service?: string
}

export interface EmailUserDto {
  email: string
  service?: string
  password?: string
}

export interface SmsUserDto {
  phone: string
  code?: string
  service?: string
  useCall?: boolean
}

export interface TokenDto {
  token: string
}

export interface TokenPair {
  accessToken: string
  refreshToken: string
}

export interface TokenPasswordDto {
  token: string
  password: string
}
