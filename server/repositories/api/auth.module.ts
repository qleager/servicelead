import FetchFactory from '@shared/repositories/factory'
import type { Response } from '@shared/types/api'
import type { FetchOptions } from '@shared/types/repositories'
import type { AuthCodeDto, AuthType, AuthValueBase, AuthValueDto, RegisteredUser, TokenAuthValueDto, TokenDto, TokenPair, TokenPasswordDto, TokenServiceDto, UserIdTokenDto } from '~~/server/types/api/auth'

class AuthModule extends FetchFactory {
  private RESOURCE = '/v2'

  async authorize(type: AuthType, fetchOptions?: FetchOptions<AuthCodeDto>) {
    return this.call<Response<TokenPair>>(
      `${this.RESOURCE}/authorize/${type}`,
      {
        method: 'POST',
        ...fetchOptions,
      },
    )
  }

  async registerUser(type: AuthType, fetchOptions?: FetchOptions<AuthCodeDto>) {
    return this.call<Response<RegisteredUser>>(
      `${this.RESOURCE}/registerUser/${type}`,
      {
        method: 'POST',
        ...fetchOptions,
      },
    )
  }

  async resetPassword(type: AuthType, fetchOptions?: FetchOptions<UserIdTokenDto>) {
    return this.call<Response<void>>(
      `${this.RESOURCE}/resetPassword/${type}`,
      {
        method: 'POST',
        ...fetchOptions,
      },
    )
  }

  async resetPasswordRequest(type: AuthType, fetchOptions?: FetchOptions<AuthValueDto>) {
    return this.call<Response<void>>(
      `${this.RESOURCE}/resetPasswordRequest/${type}`,
      {
        method: 'POST',
        ...fetchOptions,
      },
    )
  }

  async resetPasswordConfirmation(type: AuthType, fetchOptions?: FetchOptions<TokenDto>) {
    return this.call<Response<void>>(
      `${this.RESOURCE}/resetPasswordConfirmation/${type}`,
      {
        method: 'POST',
        ...fetchOptions,
      },
    )
  }

  async changePassword(type: AuthType, fetchOptions?: FetchOptions<TokenPasswordDto>) {
    return this.call<Response<TokenPair>>(
      `${this.RESOURCE}/changePassword/${type}`,
      {
        method: 'POST',
        ...fetchOptions,
      },
    )
  }

  async changePasswordRequest(type: AuthType, fetchOptions?: FetchOptions<AuthValueDto>) {
    return this.call<Response<void>>(
      `${this.RESOURCE}/changePasswordRequest/${type}`,
      {
        method: 'POST',
        ...fetchOptions,
      },
    )
  }

  async changePasswordConfirmation(type: AuthType, fetchOptions?: FetchOptions<TokenPasswordDto>) {
    return this.call<Response<void>>(
      `${this.RESOURCE}/changePasswordConfirmation/${type}`,
      {
        method: 'POST',
        ...fetchOptions,
      },
    )
  }

  async addAuthValue(type: AuthType, fetchOptions?: FetchOptions<TokenAuthValueDto>) {
    return this.call<Response<void>>(
      `${this.RESOURCE}/addAuthValue/${type}`,
      {
        method: 'POST',
        ...fetchOptions,
      },
    )
  }

  async verifyToken(fetchOptions?: FetchOptions<TokenServiceDto>) {
    return this.call<Response<number>>(
      `${this.RESOURCE}/verifyToken`,
      {
        method: 'POST',
        ...fetchOptions,
      },
    )
  }

  async refreshToken(fetchOptions?: FetchOptions<TokenDto>) {
    return this.call<Response<TokenPair>>(
      `${this.RESOURCE}/refreshToken`,
      {
        method: 'POST',
        ...fetchOptions,
      },
    )
  }

  async getUserLogin(fetchOptions?: FetchOptions<TokenDto>) {
    return this.call<Response<string>>(
      `${this.RESOURCE}/getUserLogin`,
      {
        method: 'POST',
        ...fetchOptions,
      },
    )
  }

  async getUserLogins(fetchOptions?: FetchOptions<TokenDto>) {
    return this.call<Response<AuthValueBase>>(
      `${this.RESOURCE}/getUserLogins`,
      {
        method: 'POST',
        ...fetchOptions,
      },
    )
  }

  async closeSession(fetchOptions?: FetchOptions<UserIdTokenDto>) {
    return this.call<Response<void>>(
      `${this.RESOURCE}/closeSession`,
      {
        method: 'POST',
        ...fetchOptions,
      },
    )
  }
}

export default AuthModule
