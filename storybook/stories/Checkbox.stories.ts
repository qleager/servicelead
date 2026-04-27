import type { Meta, StoryObj } from '@nuxtjs/storybook'
import AppCheckbox from '@components/app/Checkbox.vue'
import { iconNames } from '../helpers/icon-names'

export default {
  title: 'App/Checkbox',
  component: AppCheckbox,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    // Props
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
    icon: {
      control: 'select',
      options: iconNames,
    },
    // Slots
    label: {
      control: 'text',
      table: { category: 'slots' },
    },
    // Behavioral Props
    modelValue: {
      control: 'boolean',
      table: { category: 'behavioral props' },
    },
    id: {
      control: 'text',
      table: { category: 'behavioral' },
    },
    name: {
      control: 'text',
      table: { category: 'behavioral' },
    },
    value: {
      control: 'text',
      table: { category: 'behavioral' },
    },
  },
  args: {
    size: 'md',
    label: 'Checkbox Label',
    disabled: false,
    required: false,
    icon: 'check_24',
    id: 'checkbox',
    name: 'checkbox',
    value: 'accept',
    modelValue: false,
  },
} satisfies Meta<typeof AppCheckbox>

type Story = StoryObj<typeof AppCheckbox>

export const Playground: Story = {}
