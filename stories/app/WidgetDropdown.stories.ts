import type { Meta, StoryObj } from '@nuxtjs/storybook'
import WidgetDropdown from '@components/app/WidgetDropdown.vue'
import AppTag from '@components/app/Tag.vue'
import { iconNames } from '@app/types/components/app/icon'

export default {
  title: 'App/WidgetDropdown',
  component: WidgetDropdown,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    // Props
    title: {
      control: 'text',
      table: { category: 'props' },
    },
    icon: {
      control: 'select',
      options: [null, ...iconNames],
      table: { category: 'props' },
    },

    // Slots
    default: {
      control: 'text',
    },
    content: {
      control: 'text',
    },
    description: {
      control: 'text',
      table: { category: 'slots' },
    },
    footer: {
      control: 'boolean',
    },
  },
  args: {
    title: 'Widget dropdown',
    description: 'Widget dropdown description',
    icon: 'domain',

    default: 'Default Slot: нажми чтобы открыть',
    content: 'Dropdown widget content',
    footer: true,
  },
} satisfies Meta<typeof WidgetDropdown>

type Story = StoryObj<typeof WidgetDropdown>

export const Playground: Story = {
  render: args => ({
    components: { WidgetDropdown, AppTag },
    setup: () => ({ args }),
    template: `
      <WidgetDropdown
        :title="args.title"
        :icon="args.icon"
      >
        <template #default="{ isOpen }">
          <AppTag
            v-if="args.default"
            size="sm"
            color="gray"
            variant="soft"
          >
            {{ args.default }}
          </AppTag>
        </template>
        <template v-if="args.description" #description>
          <strong>{{ args.description }}</strong>
        </template>
        <template v-if="args.content" #content>
          <div>{{ args.content }}</div>
        </template>
        <template v-if="args.footer" #footer>
          <AppTag size="sm" color="gray" variant="soft">
            Footer Slot
          </AppTag>
        </template>
      </WidgetDropdown>
    `,
  }),
}
