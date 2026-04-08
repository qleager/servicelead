import type { Meta, StoryObj } from '@nuxtjs/storybook'
import AppConfirmDialog from '@components/app/ConfirmDialog.vue'
import AppTag from '@components/app/Tag.vue'

export default {
  title: 'App/ConfirmDialog',
  component: AppConfirmDialog,
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
    accept: {
      control: 'text',
    },
    reject: {
      control: 'text',
    },
    // Slots
    default: {
      control: 'text',
      table: { category: 'slots' },
    },
  },
  args: {
    title: 'Вы уверены?',
    description: 'Это действие нельзя отменить',
    accept: 'Да',
    reject: 'Отмена',
    default: 'Default Slot: нажми чтобы открыть',
  },
} satisfies Meta<typeof AppConfirmDialog>

type Story = StoryObj<typeof AppConfirmDialog>

export const Playground: Story = {
  render: args => ({
    components: { AppConfirmDialog, AppTag },
    setup: () => ({ args }),
    template: `
      <AppConfirmDialog
        class="confirm-dialog"
        :model-value="true"
        :title="args.title"
        :description="args.description"
        :accept="args.accept"
        :reject="args.reject"
      >
        <template #default>
          <AppTag v-if="args.default" size="sm" color="gray" variant="soft" :rounded="false">{{ args.default }}</AppTag>
        </template>
      </AppConfirmDialog>
    `,
  }),
}
