import AuthModule from '~~/server/repositories/api/auth.module'

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
    const { apiAuthUrl } = useRuntimeConfig(event)

    const apiFetcher = $fetch.create({
      baseURL: apiAuthUrl,
    })

    event.context.api = {
      auth: new AuthModule(apiFetcher),
    }
  })
})
