/*
 * Guide: https://nuxt.com/docs/api/configuration/nuxt-config
 * Spritemap plugin: https://spiriitlabs.github.io/vite-plugin-svg-spritemap/options/
 */
import { fileURLToPath } from 'node:url'
import VitePluginSvgSpritemap from '@spiriit/vite-plugin-svg-spritemap'

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
    plugins: [
      VitePluginSvgSpritemap('./assets/icon/*.svg', {
        prefix: false,
        route: 'sprite',
        output: 'sprite.[hash][extname]',
        svgo: {
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  cleanupIds: false,
                },
              },
            },
            {
              name: 'prefixIds',
              params: {
                prefix: false,
              },
            },
          ],
        },
      }),
    ],
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },
})
