import AuthModule from '~/repository/api/modules/auth.module'

export default defineNuxtPlugin(() => {
  const event = useRequestEvent()

  const apiFetcher = $fetch.create({
    baseURL: '/api',
    headers: event ? event.headers : undefined,
  })

  const modules = {
    auth: new AuthModule(apiFetcher),
  }

  return {
    provide: {
      api: modules,
    },
  }
})
