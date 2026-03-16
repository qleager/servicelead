import type { Meta, StoryObj } from '@nuxtjs/storybook'
import AppCard from '@components/app/Card.vue'
import AppTag from '@components/app/Tag.vue'
import AppButton from '@components/app/Button.vue'

export default {
  title: 'App/Card',
  component: AppCard,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    // Props
    title: {
      control: 'text',
    },
    description: {
      control: 'text',
    },

    // Slots
    top: {
      control: 'boolean',
      name: 'Top',
    },
    header: {
      control: 'boolean',
      name: 'Header',
    },
    titleSlot: {
      control: 'boolean',
      name: 'Title Slot',
    },
    descriptionSlot: {
      control: 'boolean',
      name: 'Description Slot',
    },
    content: {
      control: 'boolean',
      name: 'Content',
    },
    footer: {
      control: 'boolean',
      name: 'Footer',
    },
    bottom: {
      control: 'boolean',
      name: 'Bottom',
    },
  },
  args: {
    title: 'Card title',
    description: 'Card description',

    top: false,
    header: false,
    titleSlot: false,
    descriptionSlot: false,
    content: true,
    footer: true,
    bottom: false,
  },
} satisfies Meta<typeof AppCard>

type Story = StoryObj<typeof AppCard>

export const Playground: Story = {
  render: args => ({
    components: { AppCard, AppTag, AppButton },
    setup: () => ({ args }),
    template: `
      <div style="width:320px;">
        <AppCard
          :title="args.title"
          :description="args.description"
        >
          <template v-if="args.top" #top>
            <AppTag size="sm" color="gray" variant="soft">Top Slot</AppTag>
          </template>

          <template v-if="args.header" #header>
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <div>Custom Header</div>
              <AppButton size="xs" variant="soft">Action</AppButton>
            </div>
          </template>

          <template v-if="args.titleSlot" #title>
            Custom Title Slot
          </template>

          <template v-if="args.descriptionSlot" #description>
            Custom Description Slot
          </template>

          <template v-if="args.content" #content>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>
          </template>

          <template v-if="args.footer" #footer>
            <AppButton size="sm" variant="lined">
              Footer action
            </AppButton>
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