export default defineEventHandler(async (event) => {
  const url = useRuntimeConfig(event).apiUrl
  const path = event.path
  const target = url + path

  const cookies = parseCookies(event)

  return proxyRequest(event, target, {
    headers: {
      Authorization: `Bearer ${cookies.accessToken}`,
      deviceId: cookies.fingerprint,
    },
  })
})
