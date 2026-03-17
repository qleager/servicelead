import type { Meta, StoryObj } from '@nuxtjs/storybook'
import AppWidget from '@components/app/Widget.vue'
import AppTag from '@components/app/Tag.vue'
import { iconNames } from '@app/types/components/app/icon'

export default {
  title: 'App/Widget',
  component: AppWidget,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    // Props
    'title': {
      control: 'text',
    },
    'icon': {
      control: 'select',
      options: [null, ...iconNames],
    },

    // Slots
    'content': {
      control: 'text',
    },
    'description': {
      control: 'text',
      table: { category: 'slots' },
    },
    'footer': {
      control: 'boolean',
    },

    // Events
    'click:button': { action: 'click:button' },
  },
  args: {
    title: 'Widget title',
    description: 'Widget description',
    icon: 'domain',

    content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt aperiam molestias at nisi veniam dicta quaerat, excepturi eligendi ratione rerum amet earum cumque enim culpa neque! Voluptatem aperiam cupiditate vero.',
    descriptionSlot: false,
    footer: true,
  },
} satisfies Meta<typeof AppWidget>

type Story = StoryObj<typeof AppWidget>

export const Playground: Story = {
  render: args => ({
    components: { AppWidget, AppTag },
    setup: () => ({ args }),
    template: `
      <div style="width:320px;">
        <AppWidget
          :title="args.title"
          :description="args.description"
          :icon="args.icon"
          @click:button="args['click:button']"
        >
          <template v-if="args.descriptionSlot" #description>
            <strong>Custom description slot</strong>
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
