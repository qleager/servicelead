import VitePluginSvgSpritemap from '@spiriit/vite-plugin-svg-spritemap'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT_DIR = fileURLToPath(new URL('../', import.meta.url))

export function svgSpritePlugin() {
  return VitePluginSvgSpritemap(resolve(ROOT_DIR, 'app/assets/icons/*.svg'), {
    prefix: false,
    route: '/_nuxt/sprite',
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
  })
}
