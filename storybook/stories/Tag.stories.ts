import type { Meta, StoryObj } from '@nuxtjs/storybook'
import AppTag from '@components/app/Tag.vue'
import { iconNames } from '../helpers/icon-names'

export default {
  title: 'App/Tag',
  component: AppTag,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    // Props
    variant: {
      control: 'select',
      options: ['solid', 'soft', 'outline', 'nofilled'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    color: {
      control: 'select',
      options: ['primary', 'neutral', 'gray', 'red', 'yellow', 'green', 'blue', 'purple', 'white'],
    },
    icon: {
      control: 'select',
      options: [null, ...iconNames],
    },
    actionable: {
      control: 'boolean',
    },
    closable: {
      control: 'boolean',
    },
    rounded: {
      control: 'boolean',
    },
    trailingIcon: {
      control: 'boolean',
    },
    // Slots
    default: {
      control: 'text',
    },
  },
  args: {
    variant: 'solid',
    size: 'md',
    color: 'primary',
    icon: 'domain',
    actionable: false,
    closable: false,
    rounded: true,
    trailingIcon: false,
    default: 'Tag Text',
  },
} satisfies Meta<typeof AppTag>

type Story = StoryObj<typeof AppTag>

export const Playground: Story = {}
