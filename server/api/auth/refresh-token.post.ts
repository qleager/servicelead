import { isErrorResponse, type Response } from '@shared/types/api'

export default defineEventHandler(async (event) => {
  const api = event.context.api
  const cookies = parseCookies(event)

  assertFingerprint(cookies.fingerprint)
  assertRefreshToken(cookies.refreshToken)

  try {
    const { data } = await api.auth.refreshToken({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'deviceId': cookies.fingerprint,
      },
      body: {
        token: cookies.refreshToken,
      },
    })

    setAccessToken(event, data.accessToken)
    setRefreshToken(event, data.refreshToken)

    setResponseStatus(event, 204)
  }

  catch (error) {
    if (isErrorResponse(error)) {
      deleteCookie(event, 'accessToken')
      deleteCookie(event, 'refreshToken')

      throwError(error)
    }
  }
})
