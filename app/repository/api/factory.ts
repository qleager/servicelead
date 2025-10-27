import type { $Fetch, NitroFetchOptions } from 'nitropack'

class HttpFactory {
  private readonly $fetch: $Fetch

  constructor(fetch: $Fetch) {
    this.$fetch = fetch
  }

  async call<T>(url: string, fetchOptions: NitroFetchOptions<'json'>): Promise<T> {
    return this.$fetch<T>(
      url,
      {
        ...fetchOptions,
      },
    )
  }
}
export default HttpFactory
