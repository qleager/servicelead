import type { Meta, StoryObj } from '@nuxtjs/storybook'
import AppInput from '@components/app/Input.vue'
import AppLabel from '@components/app/FormField.vue'

export default {
  title: 'App/FormField',
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
    name: {
      control: 'text',
      table: { category: 'behavioral props' },
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
    name: 'form-field',
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
