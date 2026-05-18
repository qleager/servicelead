import type { LoginPayload } from '@shared/types/api/auth.bff'

export default defineEventHandler(async (event) => {
  const api = event.context.api
  const cookies = parseCookies(event)
  const serviceName = useRuntimeConfig(event).apiServiceName
  const body = await readBody<LoginPayload>(event)

  if (!cookies.fingerprint) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing fingerprint',
      data: {
        message: 'Need a fingerprint cookie',
      },
    })
  }

  const result = await api.auth.authorize('Email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'deviceId': cookies.fingerprint,
    },
    body: {
      serviceName,
      authValue: body.email,
      authCode: body.password,
    },
  })

  if (result) {
    const { data } = result

    setCookie(event, 'accessToken', data.accessToken, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 0.95,
    })

    setCookie(event, 'refreshToken', data.refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 29,
    })

    setResponseStatus(event, 204)

    return
  }

  return result
})
