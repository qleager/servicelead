import type { Meta, StoryObj } from '@nuxtjs/storybook'
import AppLabeledValue from '@components/app/LabeledValue.vue'

export default {
  title: 'App/LabeledValue',
  component: AppLabeledValue,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    // Props
    size: {
      control: 'select',
      options: ['sm', 'lg'],
    },
    // Slots
    caption: {
      control: 'text',
      table: { category: 'slots' },
    },
    leadingValue: {
      control: 'text',
      table: { category: 'slots' },
    },
    value: {
      control: 'text',
      table: { category: 'slots' },
    },
    trailingValue: {
      control: 'text',
      table: { category: 'slots' },
    },
  },
  args: {
    size: 'lg',
    caption: 'Итого, без НДС',
    leadingValue: '₽',
    value: '1 999,00',
    trailingValue: 'RUB',
  },
} satisfies Meta<typeof AppLabeledValue>

type Story = StoryObj<typeof AppLabeledValue>

export const Playground: Story = {
  render: args => ({
    components: { AppLabeledValue },
    setup: () => ({ args }),
    template: `
      <AppLabeledValue :size="args.size">
        <template v-if="args.caption" #caption>
          {{ args.caption }}
        </template>
        <template v-if="args.leadingValue" #leadingValue>
          {{ args.leadingValue }}
        </template>
        <template v-if="args.value" #value>
          {{ args.value }}
        </template>
        <template v-if="args.trailingValue" #trailingValue>
          {{ args.trailingValue }}
        </template>
      </AppLabeledValue>
    `,
  }),
}
