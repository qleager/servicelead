import { joinURL } from 'ufo'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const url = useRuntimeConfig(event).apiAuthUrl
  const path = '/auth/v2/resetPasswordRequest/email'
  const cookies = parseCookies(event)
  const target = joinURL(url, path)

  const response = await fetch(target, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'deviceId': cookies.fingerprint,
    },
    body: JSON.stringify({
      ...body,
      serviceName: 'LeadSale',
    }),
  })
})