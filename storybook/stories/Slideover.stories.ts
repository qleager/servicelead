import type { Meta, StoryObj } from '@nuxtjs/storybook'
import AppSlideover from '@components/app/Slideover.vue'
import AppTag from '@components/app/Tag.vue'
import { iconNames } from '../helpers/icon-names'

export default {
  title: 'App/Slideover',
  component: AppSlideover,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    // Props
    description: {
      control: 'text',
    },
    icon: {
      control: 'select',
      options: [null, ...iconNames],
    },
    title: {
      control: 'text',
    },
    // Slots
    content: {
      control: 'text',
    },
    default: {
      control: 'text',
    },
    footer: {
      control: 'boolean',
    },
    // Behavioral Props
    modelValue: {
      control: 'boolean',
      table: { category: 'Behavioral props' },
    },
  },
  args: {
    description: 'Description',
    icon: 'domain',
    title: 'Title',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    default: 'Default Slot: нажми чтобы открыть',
    footer: true,
    modelValue: true,
  },
} satisfies Meta<typeof AppSlideover>

type Story = StoryObj<typeof AppSlideover>

export const Playground: Story = {
  render: args => ({
    components: { AppSlideover, AppTag },
    setup: () => ({ args }),
    template: `
      <AppSlideover
        v-model="args.modelValue"
        :description="args.description"
        :icon="args.icon"
        :title="args.title"
      >
        <template v-if="args.content" #content>
          <div>
            {{ args.content }}
          </div>
        </template>
        <template v-if="args.default" #default="{ isOpen }">
          <AppTag size="sm" color="gray" variant="soft" :rounded="false">
            {{ args.default }}
          </AppTag>
        </template>
        <template v-if="args.footer" #footer>
          <AppTag size="sm" color="gray" variant="soft" :rounded="false">Footer Slot</AppTag>
        </template>
      </AppSlideover>
    `,
  }),
}
