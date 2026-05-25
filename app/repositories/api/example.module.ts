import FetchFactory from '@shared/repositories/factory'
import type { Response } from '@shared/types/api'
import type { FetchOptions } from '@shared/types/repositories'
import type { ExamplePayload, ExampleResponse } from '~/types/api/example'

class ExampleModule extends FetchFactory {
  private RESOURCE = '/finance'

  async exampleMethode(fetchOptions?: FetchOptions<ExamplePayload>) {
    return this.call<Response<ExampleResponse>>(
      `${this.RESOURCE}/example`,
      {
        method: 'POST',
        ...fetchOptions,
      },
    )
  }
}

export default ExampleModule
