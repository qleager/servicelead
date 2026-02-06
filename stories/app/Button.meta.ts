import type { Meta } from '@storybook/vue3'
import AppButton from '~/components/app/Button.vue'
import { iconNames } from '~/types/components/app/icon'

const iconOptions = [null, ...iconNames] as const

export const baseMeta: Meta<typeof AppButton> = {
  component: AppButton,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: {
    label: 'Button',
    variant: 'filled',
    size: 'md',
    color: 'primary',
    type: 'button',
    rounded: true,
    trailingIcon: false,
    disabled: false,
    active: false,
    loading: false,
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
    },
    icon: {
      control: 'select',
      options: iconOptions,
    },
    target: {
      control: 'select',
      options: ['_self', '_blank', '_parent', '_top'],
    },
    label: {
      control: 'text',
      description: 'Default slot content',
    },
  },
}
