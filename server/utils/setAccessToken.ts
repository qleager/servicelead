import type { H3Event } from 'h3'

/**
 * Stores an access token in a secure, HTTP-only cookie.
 *
 * @param event - Current H3 request event used to set the response cookie.
 * @param token - Access token to store.
 */
export function setAccessToken(event: H3Event, token: string) {
  setCookie(event, 'accessToken', token, {
    httpOnly: true,
    secure: true,
    path: '/',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7,
  })
}
