import type { Meta, StoryObj } from '@nuxtjs/storybook'
import AppCopyToClipboard from '@components/app/CopyToClipboard.vue'

export default {
  title: 'App/CopyToClipboard',
  component: AppCopyToClipboard,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    // Props
    source: {
      control: 'text',
    },
    trailingIcon: {
      control: 'boolean',
    },
    // Slots
    default: {
      control: 'text',
      table: { category: 'slots' },
    },
  },
  args: {
    source: 'ID4512',
    trailingIcon: false,
    default: 'ID4512',
  },
} satisfies Meta<typeof AppCopyToClipboard>

type Story = StoryObj<typeof AppCopyToClipboard>

export const Playground: Story = {
  render: args => ({
    components: { AppCopyToClipboard },
    setup: () => ({ args }),
    template: `
      <AppCopyToClipboard
        :source="args.source"
        :trailing-icon="args.trailingIcon"
      >
        {{ args.default }}
      </AppCopyToClipboard>
    `,
  }),
}
