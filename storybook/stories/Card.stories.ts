import type { Meta, StoryObj } from '@nuxtjs/storybook'
import AppCard from '@components/app/Card.vue'
import AppTag from '@components/app/Tag.vue'

export default {
  title: 'App/Card',
  component: AppCard,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    // Slots
    top: {
      control: 'boolean',
    },
    header: {
      control: 'boolean',
    },
    title: {
      control: 'text',
      table: { category: 'slots' },
    },
    color: {
      control: 'select',
      options: ['white', 'neutral'],
    },
    description: {
      control: 'text',
      table: { category: 'slots' },
    },
    content: {
      control: 'text',
    },
    footer: {
      control: 'boolean',
    },
    bottom: {
      control: 'boolean',
    },
  },
  args: {
    title: 'Card title',
    description: 'Card description',
    color: 'white',
    top: false,
    header: false,
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.1',
    footer: true,
    bottom: false,
  },
} satisfies Meta<typeof AppCard>

type Story = StoryObj<typeof AppCard>

export const Playground: Story = {
  render: args => ({
    components: { AppCard, AppTag },
    setup: () => ({ args }),
    template: `
      <div style="width:320px;">
        <AppCard :color="args.color">
          <template v-if="args.top" #top>
            <AppTag size="sm" color="gray" variant="soft">Top Slot</AppTag>
          </template>

          <template v-if="args.header" #header>
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <AppTag size="sm" color="gray" variant="soft">Header Slot</AppTag>
            </div>
          </template>

          <template v-if="args.title" #title>
            {{ args.title }}
          </template>

          <template v-if="args.description" #description>
            {{ args.description }}
          </template>

          <template v-if="args.content" #content>
            <div>
              {{ args.content }}
            </div>
          </template>

          <template v-if="args.footer" #footer>
            <AppTag size="sm" color="gray" variant="soft">Footer Slot</AppTag>
          </template>

          <template v-if="args.bottom" #bottom>
            <AppTag size="sm" color="gray" variant="soft">
              Bottom Slot
            </AppTag>
          </template>
        </AppCard>
      </div>
    `,
  }),
}
