import FetchFactory from '@shared/repository/factory'
import type { Response } from '@shared/types/api'
import type { FetchOptions } from '@shared/types/repository'
import type { AuthCodeDto, AuthType, TokenPair } from '~~/server/types/api/auth'

class AuthModule extends FetchFactory {
  private RESOURCE = '/auth'

  async authorize(type: AuthType, fetchOptions?: FetchOptions<AuthCodeDto>) {
    return this.call<Response<TokenPair>>(
      `${this.RESOURCE}/${type}`,
      {
        method: 'POST',
        ...fetchOptions,
      },
    )
  }
}

export default AuthModule
