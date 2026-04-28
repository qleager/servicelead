import type { Meta, StoryObj } from '@nuxtjs/storybook'
import AppInput from '@components/app/Input.vue'
import AppLabel from '@components/app/Label.vue'

export default {
  title: 'App/Label',
  component: AppLabel,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    title: {
      control: 'text',
    },
    caption: {
      control: 'text',
    },
    error: {
      control: 'text',
    },
    required: {
      control: 'boolean',
    },
    default: {
      control: 'boolean',
      table: { category: 'slots' },
    },
  },
  args: {
    title: 'Label',
    caption: 'Caption text',
    error: '',
    default: true,
    required: false,
  },
} satisfies Meta<typeof AppLabel>

type Story = StoryObj<typeof AppLabel>

export const Playground: Story = {
  render: args => ({
    components: { AppInput, AppLabel },
    setup: () => ({ args }),
    template: `
      <AppLabel v-bind="args">
        <AppInput v-if="args.default" placeholder="Default Slot" />
      </AppLabel>
    `,
  }),
}
