import type { Preview } from '@storybook-vue/nuxt'

// TODO: Упростить интерфейс для production, чтобы дизайнерам не было страшно
// 1. Убрать actions и interactions
// const mode = process.env.NODE_ENV

const preview: Preview = {
  decorators: [
    () => ({
      template: `
        <div id="teleports"></div>
        <story />
      `,
    }),
  ],
  parameters: {
    layout: 'centered',
    controls: {
      disableSaveFromUI: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      panelPosition: 'right',
    },
  },
}

export default preview
