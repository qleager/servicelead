import type { Meta, StoryObj } from '@nuxtjs/storybook'
import AppWidget from '@components/app/Widget.vue'
import AppTag from '@components/app/Tag.vue'
import { iconNames } from '../helpers/icon-names'

export default {
  title: 'App/Widget',
  component: AppWidget,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    // Props
    title: {
      control: 'text',
    },
    icon: {
      control: 'select',
      options: [null, ...iconNames],
    },
    color: {
      control: 'select',
      options: ['white', 'neutral'],
    },

    // Slots
    content: {
      control: 'text',
    },
    trailingHeader: {
      control: 'boolean',
      table: { category: 'slots' },
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
    title: 'Widget title',
    description: 'Widget description',
    trailingHeader: true,
    icon: 'domain',
    color: 'white',

    content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt aperiam molestias at nisi veniam dicta quaerat, excepturi eligendi ratione rerum amet earum cumque enim culpa neque! Voluptatem aperiam cupiditate vero.',
    footer: true,
  },
} satisfies Meta<typeof AppWidget>

type Story = StoryObj<typeof AppWidget>

export const Playground: Story = {
  render: args => ({
    components: { AppWidget, AppTag },
    setup: () => ({ args }),
    template: `
      <div style="width:420px;">
        <AppWidget
          :title="args.title"
          :icon="args.icon"
          :color="args.color"
        >
          <template v-if="args.trailingHeader" #trailingHeader>
            <AppTag size="sm" color="gray" variant="soft">
              Trailing Header Slot
            </AppTag>
          </template>
          <template v-if="args.description" #description>
            {{ args.description }}
          </template>
          <template #content>
            <div>{{ args.content }}</div>
          </template>
          <template v-if="args.footer" #footer>
            <AppTag size="sm" color="gray" variant="soft">
              Footer Slot
            </AppTag>
          </template>
        </AppWidget>
      </div>
    `,
  }),
}
