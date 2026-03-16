import type { Meta, StoryObj } from '@nuxtjs/storybook'
import AppConfirmDialog from '@components/app/ConfirmDialog.vue'
import AppTag from '@components/app/Tag.vue'
import { iconNames } from '@app/types/components/app/icon'

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
        control: 'text'
    },
    // Slots
    default: {
        control: 'text',
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
    title: 'Вы уверены?',
    description: 'Текст модального окна',
    accept: 'Да',
    reject: 'Отмена',
    default: 'Default Slot: нажми чтобы открыть',
    modelValue: true,
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
        v-model="args.modelValue"
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
