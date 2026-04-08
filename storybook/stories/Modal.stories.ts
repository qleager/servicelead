import type { Meta, StoryObj } from '@nuxtjs/storybook'
import AppModal from '@components/app/Modal.vue'
import AppTag from '@components/app/Tag.vue'
import { iconNames } from '../helpers/icon-names'

export default {
  title: 'App/Modal',
  component: AppModal,
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
    icon: {
      control: 'select',
      options: [null, ...iconNames],
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
    footer: {
      control: 'boolean',
      table: { category: 'slots' },
    },
    // Behavioral Props
    modelValue: {
      control: 'boolean',
      description: 'показано или скрыто',
      table: { category: 'behavioral props' },
    },
  },
  args: {
    title: 'Заголовок модального окна',
    description: 'Краткое вспомогательное описание',
    icon: 'domain',
    default: 'Default Slot: нажми чтобы открыть',
    content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt aperiam molestias at nisi veniam dicta quaerat, excepturi eligendi ratione rerum amet earum cumque enim culpa neque! Voluptatem aperiam cupiditate vero.',
    footer: true,
    modelValue: true,
  },
} satisfies Meta<typeof AppModal>

type Story = StoryObj<typeof AppModal>

export const Playground: Story = {
  render: args => ({
    components: { AppModal, AppTag },
    setup: () => ({ args }),
    template: `
      <AppModal
        v-model="args.modelValue"
        :title="args.title"
        :description="args.description"
        :icon="args.icon"
      >
        <template #default>
        <AppTag v-if="args.default" size="sm" color="gray" variant="soft" :rounded="false">{{ args.default }}</AppTag>
        </template>
        <template v-if="args.content" #content="{ close }">
          <div>
            <div>{{ args.content }}</div>
          </div>
        </template>
        <template v-if="args.footer" #footer="{}">
          <AppTag v-if="args.footer" size="sm" color="gray" variant="soft" :rounded="false">Footer Slot</AppTag>
        </template>
      </AppModal>
    `,
  }),
}
