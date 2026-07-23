import { isErrorResponse } from "~~/shared/types/api";

/**
 * Converts an upstream fetch error into an H3 error.
 *
 * Errors that do not match the upstream API response format are rethrown
 * unchanged so they can be handled by Nitro.
 *
 * @param error - Unknown error caught while calling the upstream API.
 * @throws An H3 error for upstream fetch failures or the original error.
 */
export function throwError(error: unknown){
  if (isErrorResponse(error)) {
    throw createError({
      statusCode: error.statusCode,
      statusMessage: error.data?.error ?? undefined,
    })
  }

  throw error
}
