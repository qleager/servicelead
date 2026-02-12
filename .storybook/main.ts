import type { StorybookConfig } from '@storybook-vue/nuxt'
import { svgSpritePlugin } from '../config/vite-svg-sprite'

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.stories.ts',
  ],
  framework: {
    name: '@storybook-vue/nuxt',
    options: {},
  },

  viteFinal(config) {
    config.plugins = config.plugins ||= []

    config.plugins.push(svgSpritePlugin())

    return config
  },
}

export default config
