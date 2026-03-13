import type { Meta, StoryObj } from '@nuxtjs/storybook'
import AppTitle from '@components/app/Title.vue'
import { iconNames } from '@app/types/components/app/icon'

export default {
  title: 'App/Title',
  component: AppTitle,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    // Props
    size: {
      control: 'select',
      options: ['md'],
    },
    // Slots
    icon: {
      control: 'select',
      options: [null, ...iconNames],
      table: { category: 'slots ' },
    },
    title: {
      control: 'text',
      table: { category: 'slots ' },
    },
  },
  args: {
    size: 'md',
    icon: 'chart',
    title: 'Заголовок',
  },
} satisfies Meta<typeof AppTitle>

type Story = StoryObj<typeof AppTitle>

export const Playground: Story = {}
