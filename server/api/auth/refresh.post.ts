import { joinURL } from 'ufo'

export default defineEventHandler(async (event) => {
  const url = useRuntimeConfig(event).apiAuthUrl
  const path = '/auth/v2/refreshtoken'
  const cookies = parseCookies(event)
  const target = joinURL(url, path)

  const response = await fetch(target, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'deviceId': cookies.fingerprint,
    },
    body: JSON.stringify({
      token: cookies.refreshToken,
    }),
  })

  if (response.ok) {
    const { data } = await response.json()

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
  }
})