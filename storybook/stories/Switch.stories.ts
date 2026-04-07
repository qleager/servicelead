import type { Meta, StoryObj } from '@nuxtjs/storybook'
import AppSwitch from '@components/app/Switch.vue'

export default {
  title: 'App/Switch',
  component: AppSwitch,
  parameters: {
    layout: 'centered',
    backgrounds: {
      options: {
        white: { name: 'White', value: '#ffffff' },
      },
    },
  },
  globals: {
    backgrounds: { value: 'white' },
  },
  argTypes: {
    // Props
    color: {
      control: 'select',
      options: ['primary'],
    },
    size: {
      control: 'select',
      options: ['md'],
    },
    trailing: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
    // Slots
    label: {
      control: 'text',
      table: { category: 'slots' },
    },
    description: {
      control: 'text',
      table: { category: 'slots' },
    },
    // Behavioral Props
    modelValue: {
      control: 'boolean',
      table: { category: 'behavioral props' },
    },
    name: {
      table: { category: 'behavioral props' },
    },
    id: {
      control: 'text',
      table: { category: 'behavioral props' },
    },
    value: {
      control: 'text',
      table: { category: 'behavioral props' },
    },
  },
  args: {
    color: 'primary',
    size: 'md',
    label: 'Switch Label',
    description: 'Switch description',
    trailing: false,
    disabled: false,
    loading: false,
    required: false,
    modelValue: false,
    id: 'id',
    value: 'value',
  },
} satisfies Meta<typeof AppSwitch>

type Story = StoryObj<typeof AppSwitch>

export const Playground: Story = {
  render: args => ({
    components: { AppSwitch },
    setup: () => ({ args }),
    template: `
      <AppSwitch
        v-model="args.modelValue"
        v-bind="args"
      >
        <template v-if="args.label" #label>
          {{ args.label }}
        </template>
        <template v-if="args.description" #description>
          {{ args.description }}
        </template>
      </AppSwitch>
    `,
  }),
}
