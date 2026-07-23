import FetchFactory from '@shared/repositories/factory'
import type { FetchOptions } from '@shared/types/repositories'
import type { LoginPayload } from '@shared/types/api/auth.bff'

class AuthBffModule extends FetchFactory {
  private RESOURCE = '/auth'

  async login(fetchOptions: FetchOptions<LoginPayload>) {
    return this.call(
      `${this.RESOURCE}/login`,
      {
        method: 'POST',
        ...fetchOptions,
      },
    )
  }

  async refresToken(fetchOptions?: FetchOptions) {
    return this.call(
      `${this.RESOURCE}/refresh-token`,
      {
        method: 'POST',
        ...fetchOptions,
      },
    )
  }
}

export default AuthBffModule
