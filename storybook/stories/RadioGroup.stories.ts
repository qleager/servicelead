import type { Meta, StoryObj } from '@nuxtjs/storybook'
import AppIcon from '@components/app/Icon.vue'
import AppRadioGroup from '@components/app/RadioGroup.vue'
import { iconNames } from '../helpers/icon-names'

export default {
  title: 'App/RadioGroup',
  component: AppRadioGroup,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    // Props
    variant: {
      control: 'select',
      options: ['card', 'pill', 'list'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
    indicator: {
      control: 'select',
      options: ['start', 'end', 'hidden'],
    },
    disabled: {
      control: 'boolean',
    },
    error: {
      control: 'boolean',
    },
    items: {
      control: 'object',
    },
    // Slots
    icon: {
      control: 'select',
      options: [null, ...iconNames],
      table: { category: 'slots' },
    },
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
      control: 'text',
      table: { category: 'behavioral props' },
    },
    name: {
      control: 'text',
      table: { category: 'behavioral props' },
    },
  },
  args: {
    variant: 'card',
    size: 'md',
    indicator: 'start',
    disabled: false,
    error: false,
    name: 'radio-group',
    modelValue: 'weekly',
    items: [
      {
        label: 'First radio',
        description: 'Description',
        icon: 'calendar',
        value: '1',
      },
      {
        label: 'Second radio',
        description: 'Description',
        icon: 'description',
        value: '2',
      },
      {
        label: 'Disabled radio',
        description: 'Description',
        icon: 'settings',
        value: '3',
        disabled: true,
      },
    ],
    icon: null,
    label: '',
    description: '',
  },
} satisfies Meta<typeof AppRadioGroup>

type Story = StoryObj<typeof AppRadioGroup>

export const Playground: Story = {
  render: args => ({
    components: { AppIcon, AppRadioGroup },
    setup: () => ({ args }),
    template: `
      <AppRadioGroup
        v-model="args.modelValue"
        :disabled="args.disabled"
        :error="args.error"
        :indicator="args.indicator"
        :items="args.items"
        :name="args.name"
        :size="args.size"
        :variant="args.variant"
        style="min-width: 520px"
      >
        <template v-if="args.icon" #icon>
          <AppIcon :name="args.icon" class="radio-group__item-icon" />
        </template>
        <template v-if="args.label" #label>
          {{ args.label }}
        </template>
        <template v-if="args.description" #description>
          {{ args.description }}
        </template>
      </AppRadioGroup>
    `,
  }),
}
