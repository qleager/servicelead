import type { Meta, StoryObj } from '@nuxtjs/storybook'
import AppAlert from '@components/app/Alert.vue'

export default {
  title: 'App/Alert',
  component: AppAlert,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    // Props
    type: {
      control: 'select',
      options: ['info'],
    },
    // Slots
    default: {
      control: 'text',
    },
  },
  args: {
    type: 'info',
    default: 'Информационное сообщение для пользователя.',
  },
} satisfies Meta<typeof AppAlert>

type Story = StoryObj<typeof AppAlert>

export const Playground: Story = {}
