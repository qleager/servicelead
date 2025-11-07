/*
 * Guide: https://nuxt.com/docs/api/configuration/nuxt-config
 */
import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  modules: ['@nuxt/eslint'],
  devtools: { enabled: true },

  alias: {
    '@scss': fileURLToPath(new URL('./app/assets/scss', import.meta.url)),
  },

  compatibilityDate: '2025-07-15',

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@scss/design-system/index" as *; @use "@scss/globals" as *;',
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
