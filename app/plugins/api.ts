import ExampleModule from '@app/repositories/api/example.module'
import AuthBffModule from '@app/repositories/api/auth.bff.module'

export default defineNuxtPlugin(() => {
  const event = useRequestEvent()

  const apiFetcher = $fetch.create({
    baseURL: '/api',
    headers: event ? event.headers : undefined,
  })

  const modules = {
    /*
     * Method layer for accessing the external API through BFF routes.
     */
    auth: new AuthBffModule(apiFetcher),
    example: new ExampleModule(apiFetcher),
  }

  return {
    provide: {
      api: modules,
    },
  }
})
