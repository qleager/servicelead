import type { NitroFetchOptions } from 'nitropack'

/**
 * Options type construct by NitroFetchOptions.
 *
 * @template B - The type of the request body. If `B` is provided, `body` is required.
 *               If `B` is undefined, `body` is optional.
 * @template Q - The type of the query string. If `Q` is provided, `query` is required.
 *               If `Q` is undefined, `query` is optional.
 */
export type FetchOptions<B = undefined, Q = undefined>
  = Omit<NitroFetchOptions<'json'>, 'body' | 'query'> & (
      B extends undefined ? { body?: B } : { body: B }
    ) & (
      Q extends undefined ? { query?: Q } : { query: Q }
    )
