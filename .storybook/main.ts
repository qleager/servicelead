import type { StorybookConfig } from '@nuxtjs/storybook'

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.stories.ts',
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-docs'],
  framework: {
    name: '@storybook-vue/nuxt',
    options: {},
  },
}

export default config
