export default defineEventHandler((event) => {
  const url = useRuntimeConfig(event).apiUrl
  // TODO: как то мне не нра такая генерациия ссылке, переделать на что то изящное и бп'шное
  const path = event.path.replace(/^\/api/, '/leadsale/v1')
  const target = url + path

  return proxyAuthorizedRequest(event, target)
})
