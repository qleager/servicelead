import type { Meta, StoryObj } from '@nuxtjs/storybook'
import AppChip from '@components/app/Chip.vue'
import AppButton from '@components/app/Button.vue'

export default {
  title: 'App/Chip',
  component: AppChip,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    // Props
    variant: {
      control: 'select',
      options: ['solid', 'soft'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    color: {
      control: 'select',
      options: ['primary', 'neutral', 'gray', 'red', 'yellow', 'green', 'blue', 'purple'],
    },
    position: {
      control: 'select',
      options: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
    },
    inset: {
      control: 'boolean',
    },
    standalone: {
      control: 'boolean',
    },
    text: {
      control: 'text',
    },
    // Slots
    content: {
      control: 'text',
      table: { category: 'Slots' },
    },
    default: {
      control: 'boolean',
      table: { category: 'Slots' },
    },
  },
  args: {
    variant: 'solid',
    size: 'md',
    color: 'primary',
    position: 'top-right',
    inset: true,
    standalone: false,
    text: '1',
    content: '',
    default: true,
  },
} satisfies Meta<typeof AppChip>

type Story = StoryObj<typeof AppChip>

export const Playground: Story = {
  render: args => ({
    components: { AppChip, AppButton },
    setup: () => ({ args }),
    template: `
      <AppChip v-bind="args">
        <template v-if="args.content" #content>
          {{ args.content }}
        </template>

        <AppButton v-if="args.default" color="white" size="md" icon="main_menu_account">
          Profile
        </AppButton>
      </AppChip>
    `,
  }),
}
