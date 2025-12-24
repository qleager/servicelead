/*
 * Guide: https://nuxt.com/docs/api/configuration/nuxt-config
 */
import { fileURLToPath } from 'node:url'
import VitePluginSvgSpritemap from '@spiriit/vite-plugin-svg-spritemap'

export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxtjs/device'],
  devtools: { enabled: true },
  css: ['./app/assets/scss/globals.scss'],

  alias: {
    '@scss': fileURLToPath(new URL('./app/assets/scss', import.meta.url)),
    '@app': fileURLToPath(new URL('./app', import.meta.url)),
    '@server': fileURLToPath(new URL('./server', import.meta.url)),
    '@shared': fileURLToPath(new URL('./shared', import.meta.url)),
  },

  compatibilityDate: '2025-07-15',

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@scss/design-system/index" as *;',
        },
      },
    },
    plugins: [
      VitePluginSvgSpritemap('./assets/icons/*.svg', {
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
            {
              name: 'removeAttrs',
              params: {
                attrs: '(fill|stroke)',
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