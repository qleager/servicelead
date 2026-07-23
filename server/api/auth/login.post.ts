import type { LoginPayload } from '@shared/types/api/auth.bff'

export default defineEventHandler(async (event) => {
  const api = event.context.api
  const cookies = parseCookies(event)
  const serviceName = useRuntimeConfig(event).apiServiceName
  const body = await readBody<LoginPayload>(event)

  assertFingerprint(cookies.fingerprint)

  try {
    const { data } = await api.auth.authorize('Email', {
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

    setAccessToken(event, data.accessToken)
    setRefreshToken(event, data.refreshToken)

    setResponseStatus(event, 204)
  }

  catch (error) {
    throwError(error)
  }
})
