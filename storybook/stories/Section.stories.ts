import type { Meta, StoryObj } from '@nuxtjs/storybook'
import AppSection from '@components/app/Section.vue'
import AppTag from '@components/app/Tag.vue'
import { iconNames } from '../helpers/icon-names'

export default {
  title: 'App/Section',
  component: AppSection,
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
      table: { category: 'slots' },
    },
    trailingHeader: {
      control: 'boolean',
      table: { category: 'slots' },
    },
  },
  args: {
    title: 'Section title',
    icon: 'domain',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    trailingHeader: false,
  },
} satisfies Meta<typeof AppSection>

type Story = StoryObj<typeof AppSection>

export const Playground: Story = {
  render: args => ({
    components: { AppSection, AppTag },
    setup: () => ({ args }),
    template: `
      <div style="width: 480px;">
        <AppSection
          :title="args.title"
          :icon="args.icon"
        >
          <template #trailingHeader v-if="args.trailingHeader">
            <AppTag size="sm" color="gray" variant="soft">
              Trailing Header Slot
            </AppTag>
          </template>

          <template #content>
            <div>{{ args.content }}</div>
          </template>
        </AppSection>
      </div>
    `,
  }),
}
