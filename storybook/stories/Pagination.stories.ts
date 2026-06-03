import type { Meta, StoryObj } from '@nuxtjs/storybook'
import AppPagination from '@components/app/Pagination.vue'

export default {
  title: 'App/Pagination',
  component: AppPagination,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    itemsPerPage: {
      control: { min: 1, type: 'number' },
    },
    showControls: {
      control: 'boolean',
    },
    showEdges: {
      control: 'boolean',
    },
    siblingCount: {
      control: { min: 0, type: 'number' },
    },
    total: {
      control: { min: 0, type: 'number' },
    },
    modelValue: {
      control: { min: 1, type: 'number' },
      table: { category: 'Behavioral props' },
      description: 'Current page',
    },
  },
  args: {
    itemsPerPage: 10,
    showControls: true,
    showEdges: true,
    siblingCount: 2,
    total: 250,
    modelValue: 8,
  },
} satisfies Meta<typeof AppPagination>

type Story = StoryObj<typeof AppPagination>

export const Playground: Story = {
  render: args => ({
    components: { AppPagination },
    setup: () => ({ args }),
    template: `
      <AppPagination
        v-model="args.modelValue"
        :items-per-page="args.itemsPerPage"
        :show-controls="args.showControls"
        :show-edges="args.showEdges"
        :sibling-count="args.siblingCount"
        :total="args.total"
      />
    `,
  }),
}
