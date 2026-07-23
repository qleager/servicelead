/**
 * Ensures that an access token is present.
 *
 * @param token - Access token read from the request cookies.
 * @throws An H3 error with status code 401 when the token is missing.
 */
export function assertAccessToken(token: string | undefined): asserts token is string {
  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Missing access token',
    })
  }
}
