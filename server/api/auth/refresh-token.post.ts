import { isErrorResponse, type Response } from '@shared/types/api'

export default defineEventHandler(async (event) => {
  const api = event.context.api
  const cookies = parseCookies(event)

  if (!cookies.fingerprint) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing fingerprint',
      data: {
        message: 'Missing a fingerprint cookie',
      },
    })
  }

  if (!cookies.refreshToken) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing refresh token',
      data: {
        message: 'Missing a refresh token cookie',
      },
    })
  }

  try {
    const result = await api.auth.refreshToken({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'deviceId': cookies.fingerprint,
      },
      body: {
        token: cookies.refreshToken,
      },
    })

    const { data } = result

    setCookie(event, 'accessToken', data.accessToken, {
      httpOnly: true,
      sameSite: 'strict',
      // 7 days
      maxAge: 60 * 60 * 24 * 7,
    })

    setCookie(event, 'refreshToken', data.refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      // 29 days
      maxAge: 60 * 60 * 24 * 29
    })


    setResponseStatus(event, 204)
  }

  catch (error) {
    if (isErrorResponse(error)) {
      
      deleteCookie(event, 'accessToken')
      deleteCookie(event, 'refreshToken')

      throw createError({
        statusCode: error.statusCode,
        statusMessage: error.data?.error ?? undefined
      })
    }
  }
})
