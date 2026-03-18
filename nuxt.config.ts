/*
 * Guide: https://nuxt.com/docs/api/configuration/nuxt-config
 */
import { fileURLToPath } from 'node:url'
import { svgSpritePlugin } from './config/vite-svg-sprite'

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@chettapong/nuxt-lodash',
    '@nuxtjs/storybook',
    'nuxt-typed-router',
    'nuxt-echarts',
  ],

  devtools: { enabled: true },

  app: {
    head: {
      title: 'Servicelead',
      meta: [
        { name: 'robots', content: 'noindex,nofollow' },
      ],
    },
  },

  css: ['./app/assets/scss/globals.scss'],

  alias: {
    '@scss': fileURLToPath(new URL('./app/assets/scss', import.meta.url)),
    '@app': fileURLToPath(new URL('./app', import.meta.url)),
    '@components': fileURLToPath(new URL('./app/components', import.meta.url)),
    '@server': fileURLToPath(new URL('./server', import.meta.url)),
    '@shared': fileURLToPath(new URL('./shared', import.meta.url)),
  },

  compatibilityDate: '2025-07-15',

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@scss/design-system/index" as *; 
            @use "@scss/style-system/index" as *;
          `,
        },
      },
    },
    plugins: [
      svgSpritePlugin(),
    ],
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  storybook: {
    enabled: false,
    host: 'localhost',
    port: 6006,
  },
})
