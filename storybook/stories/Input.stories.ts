import type { Meta, StoryObj } from '@nuxtjs/storybook'
import AppInput from '@components/app/Input.vue'
import AppTag from '@components/app/Tag.vue'
import { iconNames } from '../helpers/icon-names'

export default {
  title: 'App/Input',
  component: AppInput,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    // Props
    variant: {
      control: 'select',
      options: ['ghost', 'soft', 'outline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
    icon: {
      control: 'select',
      options: [null, ...iconNames],
    },
    trailingIcon: {
      control: 'select',
      options: [null, ...iconNames],
    },
    placeholder: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    error: {
      control: 'boolean',
    },
    rounded: {
      control: 'boolean',
    },
    // Slots
    leading: {
      control: 'boolean',
      table: { category: 'slots' },
    },
    trailing: {
      control: 'boolean',
      table: { category: 'slots' },
    },
    // Behavioral Props
    modelValue: {
      control: 'text',
      table: { category: 'behavioral props' },
    },
    name: {
      control: 'text',
      table: { category: 'behavioral props' },
    },
    type: {
      control: 'select',
      options: ['text', 'password', 'search', 'email', 'tel', 'url'],
      table: { category: 'behavioral props' },
    },
  },
  args: {
    variant: 'outline',
    size: 'md',
    icon: 'domain',
    trailingIcon: 'eye',
    placeholder: 'Placeholder',
    disabled: false,
    error: false,
    rounded: false,
    leading: false,
    trailing: false,
    modelValue: '',
    name: 'input',
    type: 'text',
  },
} satisfies Meta<typeof AppInput>

type Story = StoryObj<typeof AppInput>

export const Playground: Story = {
  render: args => ({
    components: { AppInput, AppTag },
    setup: () => ({ args }),
    template: `
      <AppInput
        v-model="args.modelValue"
        :disabled="args.disabled"
        :error="args.error"
        :icon="args.icon"
        :name="args.name"
        :placeholder="args.placeholder"
        :rounded="args.rounded"
        :size="args.size"
        :trailing-icon="args.trailingIcon"
        :type="args.type"
        :variant="args.variant"
      >
        <template v-if="args.leading" #leading>
          <AppTag
            color="gray"
            size="sm"
          >
            Leading Slot
          </AppTag>
        </template>
        <template v-if="args.trailing" #trailing>
          <AppTag
            color="gray"
            size="sm"
          >
            Trailing Slot
          </AppTag>
        </template>
      </AppInput>
    `,
  }),
}
