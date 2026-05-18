import AuthModule from '@server/repositories/api/modules/auth.module'

interface ServerApi {
  auth: AuthModule
}

declare module 'h3' {
  interface H3EventContext {
    api: ServerApi
  }
}

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('request', (event) => {
    const { apiUrl } = useRuntimeConfig(event)

    const apiFetcher = $fetch.create({
      baseURL: apiUrl,
    })

    event.context.api = {
      auth: new AuthModule(apiFetcher),
    }
  })
})
