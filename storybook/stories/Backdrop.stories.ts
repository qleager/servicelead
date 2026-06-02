import type { Meta, StoryObj } from '@nuxtjs/storybook'
import AppBackdrop from '@components/app/Backdrop.vue'

export default {
  title: 'App/Backdrop',
  component: AppBackdrop,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    // Props
    visible: {
      control: 'boolean',
    },
  },
  args: {
    visible: true,
  },
} satisfies Meta<typeof AppBackdrop>

type Story = StoryObj<typeof AppBackdrop>

export const Playground: Story = {
  render: args => ({
    components: { AppBackdrop },
    setup: () => ({ args }),
    template: `
      <div style="min-height: 100vh; padding: 32px; display: flex; align-items: center; justify-content: center; font-size: 14px;">
        <p><strong>Backdrop preview</strong> Переключайте visible в Controls, чтобы проверить появление и скрытие слоя.</p>
        <AppBackdrop :visible="args.visible" />
      </div>
    `,
  }),
}
