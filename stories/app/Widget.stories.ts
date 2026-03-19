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
    title: {
      control: 'text',
    },
    icon: {
      control: 'select',
      options: [null, ...iconNames],
    },

    // Slots
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
    title: 'Widget title',
    description: 'Widget description',
    icon: 'domain',

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
      <div style="width:320px;">
        <AppWidget
          :title="args.title"
          :icon="args.icon"
          @click:button="console.log('пупупу')"
        >
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
