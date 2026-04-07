import type { StorybookConfig } from '@nuxtjs/storybook'
import { fileURLToPath } from 'node:url'
import VitePluginSvgSpritemap from '@spiriit/vite-plugin-svg-spritemap'

const iconsPath = fileURLToPath(new URL('../app/assets/icons/*.svg', import.meta.url))

const config: StorybookConfig = {
  stories: [
    '../storybook/stories/**/*.stories.ts',
  ],
  framework: {
    name: '@storybook-vue/nuxt',
    options: {},
  },
  async viteFinal(config) {
    return {
      ...config,
      define: {
        ...(config.define || {}),
        'import.meta.env.STORYBOOK': 'true',
      },
      plugins: [
        VitePluginSvgSpritemap(iconsPath, {
          types: './app/types/app/components/icon.d.ts',
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
        ...(config.plugins || []),
      ],
    }
  },
}

export default config
