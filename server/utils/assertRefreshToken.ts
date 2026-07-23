/**
 * Ensures that a refresh token is present.
 *
 * @param token - Refresh token read from the request cookies.
 * @throws An H3 error with status code 401 when the token is missing.
 */
export function assertRefreshToken(token: string | undefined): asserts token is string {
  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Missing refresh token',
    })
  }
}
