import FetchFactory from '@shared/repository/factory'
import type { FetchOptions } from '@shared/types/repository'
import type { LoginPayload } from '@shared/types/api/auth.bff'

class ExampleModule extends FetchFactory {
  private RESOURCE = '/auth'

  async login(fetchOptions?: FetchOptions<LoginPayload>) {
    return this.call(
      `${this.RESOURCE}/login`,
      {
        method: 'POST',
        ...fetchOptions,
      },
    )
  }
}

export default ExampleModule
