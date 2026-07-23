import type { H3Event } from 'h3'

/**
 * Stores a refresh token in a secure, HTTP-only cookie.
 *
 * @param event - Current H3 request event used to set the response cookie.
 * @param token - Refresh token to store.
 */
export function setRefreshToken(event: H3Event, token: string) {
  setCookie(event, 'refreshToken', token, {
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  })
}
