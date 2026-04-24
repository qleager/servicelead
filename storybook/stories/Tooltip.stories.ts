import type { Meta, StoryObj } from '@nuxtjs/storybook'
import AppTooltip from '@components/app/Tooltip.vue'
import AppTag from '@components/app/Tag.vue'

export default {
  title: 'App/Tooltip',
  component: AppTooltip,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    content: {
      control: 'text',
      table: { category: 'slots' },
    },
    default: {
      control: 'boolean',
      table: { category: 'slots' },
    },
  },
  args: {
    content: 'Краткая подсказка с дополнительным контекстом для пользователя.',
    default: false,
  },
} satisfies Meta<typeof AppTooltip>

type Story = StoryObj<typeof AppTooltip>

export const Playground: Story = {
  render: args => ({
    components: { AppTooltip, AppTag },
    setup: () => ({ args }),
    template: `
        <AppTooltip :content="args.content">
          <template v-if="args.default" #default>
            <AppTag size="sm" color="gray" variant="soft" :rounded="false">
              Defaull Slot
            </AppTag>
          </template>
          <template v-if="args.content" #content>
            <div>
              {{ args.content }}
            </div>
          </template>
        </AppTooltip>
    `,
  }),
}
