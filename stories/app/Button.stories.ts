import type { Meta, StoryObj } from '@nuxtjs/storybook'
import AppButton from '@components/app/Button.vue'
import { iconNames } from '@app/types/components/app/icon'

export default {
  title: 'App/Button',
  component: AppButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'lined', 'nofilled'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    color: {
      control: 'select',
      options: ['primary', 'neutral', 'white'],
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      table: { category: 'Behavioral props' },
    },
    active: {
      table: { category: 'Behavioral props' },
    },
    icon: {
      control: 'select',
      options: [null, ...iconNames],
    },
    to: {
      table: { category: 'Behavioral props' },
    },
    target: {
      control: 'select',
      options: ['_self', '_blank', '_parent', '_top'],
      table: { category: 'Behavioral props' },
    },
    value: {
      table: { category: 'Behavioral props' },
    },
    default: {
      control: 'text',
    },
  },
  args: {
    variant: 'filled',
    size: 'md',
    color: 'primary',
    type: 'button',
    rounded: true,
    trailingIcon: false,
    disabled: false,
    active: false,
    loading: false,
    default: 'Button Text',
  },
} satisfies Meta<typeof AppButton>

type Story = StoryObj<typeof AppButton>

export const Playground: Story = {
  args: {
    icon: 'domain',
    default: 'Button Text',
  },
}
