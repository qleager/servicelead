/*
 * Guide: https://nuxt.com/docs/api/configuration/nuxt-config
 */
export default defineNuxtConfig({
  modules: ['@nuxt/eslint'],
  devtools: { enabled: true },
  compatibilityDate: '2025-07-15',

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/scss/design-system" as *;',
        },
      },
    },
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },
})
