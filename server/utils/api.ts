import AuthModule from '@server/repositories/api/modules/auth.module'

export function useApi() {
  const apiFetcher = $fetch.create({
    baseURL: '/api',
  })

  return {
    auth: new AuthModule(apiFetcher),
  }
}
