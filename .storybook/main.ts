import type { StorybookConfig } from '@nuxtjs/storybook'
import { fileURLToPath } from 'node:url'
import { createSvgSpritemapPlugin } from '../config/svg-spritemap'

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
        createSvgSpritemapPlugin(iconsPath),
        ...(config.plugins || []),
      ],
    }
  },
}

export default config
