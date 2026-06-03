import type { Meta, StoryObj } from '@nuxtjs/storybook'
import AppCollapse from '@components/app/Collapse.vue'
import AppTag from '@components/app/Tag.vue'

export default {
  title: 'App/Collapse',
  component: AppCollapse,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    // Props
    initHeight: {
      control: { min: 0, step: 8, type: 'number' },
      description: 'Initial height of content in px',
    },
    // Slots
    default: {
      control: 'text',
      table: { category: 'slots' },
    },
    content: {
      control: 'text',
      table: { category: 'slots' },
    },
    // Behavioral Props
    modelValue: {
      control: 'boolean',
      description: 'Expanded or collapsed state',
      table: { category: 'behavioral props' },
    },
  },
  args: {
    initHeight: 0,
    default: 'Default Slot: нажми чтобы открыть',
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library, took a 1914 Cicero translation and scrambled it to make dummy text for Letrasets Body Type sheets. It has survived not only many decades, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised thanks to these sheets and more recently with desktop publishing software including versions of Lorem Ipsum.',
    modelValue: false,
  },
} satisfies Meta<typeof AppCollapse>

type Story = StoryObj<typeof AppCollapse>

export const Playground: Story = {
  render: args => ({
    components: { AppCollapse, AppTag },
    setup: () => ({ args }),
    template: `
      <div style="width: min(560px, calc(100vw - 48px));">
        <AppCollapse
          v-model="args.modelValue"
          :init-height="args.initHeight"
        >
        <template #default="{ isExpanded }">
          <AppTag v-if="args.default" size="sm" color="gray" variant="soft" :rounded="false">{{ args.default }}</AppTag>
        </template>

          <template #content="{ isCollapsed }">
            {{ args.content }}
          </template>
        </AppCollapse>
      </div>
    `,
  }),
}
