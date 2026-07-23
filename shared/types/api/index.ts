import { FetchError } from 'ofetch'

export interface Response<T> {
  data: T
  error: string | null
}

export function isErrorResponse(error: unknown): error is FetchError<Response<string>> {
  return error instanceof FetchError
}