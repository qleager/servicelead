import type { H3Event } from 'h3'
import { setAccessToken } from './setAccessToken'

/**
 * Proxies an incoming request to an upstream API with bearer authorization.
 *
 * When the access token is missing, the function obtains a new token pair with
 * the refresh token and updates the authentication cookies before proxying.
 *
 * @param event - Current H3 request event.
 * @param target - Absolute upstream URL that receives the proxied request.
 * @returns The response produced by the upstream API.
 * @throws An H3 error when authentication data is missing or token refresh fails.
 */
export async function proxyAuthorizedRequest(event: H3Event, target: string) {
  const cookies = parseCookies(event)
  let accessToken = cookies.accessToken

  assertFingerprint(cookies.fingerprint)

  if (!accessToken) {
    assertRefreshToken(cookies.refreshToken)

    try {
      const result = await event.context.api.auth.refreshToken({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'deviceId': cookies.fingerprint,
        },
        body: {
          token: cookies.refreshToken,
        },
      })

      accessToken = result.data.accessToken

      setAccessToken(event, accessToken)
      setRefreshToken(event, result.data.refreshToken)
    }

    catch (error) {
      deleteCookie(event, 'accessToken')
      deleteCookie(event, 'refreshToken')

      throwError(error)
    }
  }

  return proxyRequest(event, target, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      deviceId: cookies.fingerprint,
    },
  })
}
