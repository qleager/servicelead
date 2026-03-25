import type { Meta, StoryObj } from '@nuxtjs/storybook'
import AppButton from '@components/app/Button.vue'
import { iconNames } from '@app/types/components/app/icon'

export default {
  title: 'App/Button',
  component: AppButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    // Props
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'link'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    color: {
      control: 'select',
      options: ['primary', 'neutral', 'white'],
    },
    icon: {
      control: 'select',
      options: [null, ...iconNames],
    },
    // Slots
    default: {
      control: 'text',
    },
    // Behavioral Props
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      table: { category: 'Behavioral props' },
    },
    target: {
      control: 'select',
      options: ['_self', '_blank', '_parent', '_top'],
      table: { category: 'Behavioral props' },
    },
    to: {
      table: { category: 'Behavioral props' },
    },
    value: {
      table: { category: 'Behavioral props' },
    },
  },
  args: {
    variant: 'solid',
    size: 'md',
    color: 'primary',
    type: 'button',
    rounded: true,
    icon: 'domain',
    trailingIcon: false,
    disabled: false,
    loading: false,
    default: 'Button Text',
  },
} satisfies Meta<typeof AppButton>

type Story = StoryObj<typeof AppButton>

export const Playground: Story = {}
