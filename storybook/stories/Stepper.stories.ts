import type { Meta, StoryObj } from '@nuxtjs/storybook'
import AppStepper from '@components/app/Stepper.vue'
import AppTag from '@components/app/Tag.vue'

export default {
  title: 'App/Stepper',
  component: AppStepper,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    // Props
    actionable: {
      control: 'boolean',
    },
    orientation: {
      control: 'select',
      options: ['vertical'],
    },
    // Slots
    indicator: {
      control: 'boolean',
      table: { category: 'slots' },
    },
    // Behavioral Props
    modelValue: {
      control: 'select',
      options: ['account', 'company', 'details', 'confirm'],
      description: 'Current step',
      table: { category: 'behavioral props' },
    },
    items: {
      control: 'object',
      table: { category: 'behavioral props' },
    },
  },
  args: {
    actionable: true,
    indicator: false,
    items: [
      {
        description: 'Укажите имя, телефон и e-mail',
        label: 'Контактные данные',
        value: 'account',
      },
      {
        description: 'Добавьте название и реквизиты',
        label: 'Компания',
        value: 'company',
      },
      {
        description: 'Настройте параметры заявки',
        label: 'Детали',
        slot: 'details',
        value: 'details',
      },
      {
        description: 'Проверьте данные перед отправкой',
        disabled: true,
        label: 'Подтверждение',
        value: 'confirm',
      },
    ],
    orientation: 'vertical',
    modelValue: 'company',
  },
} satisfies Meta<typeof AppStepper>

type Story = StoryObj<typeof AppStepper>

export const Playground: Story = {
  render: args => ({
    components: { AppStepper, AppTag },
    setup: () => ({ args }),
    template: `
      <div style="width: min(360px, calc(100vw - 32px));">
        <AppStepper
          v-model="args.modelValue"
          :actionable="args.actionable"
          :items="args.items"
          :orientation="args.orientation"
        >
          <template v-if="args.indicator" #indicator="{ isCompleted, isCurrent }">
            <AppTag
              color="gray"
              size="sm"
              :rounded="false"
            >
              S
            </AppTag>
          </template>

          <template v-if="args.details" #details="{ item }">
            <AppTag
              color="gray"
              size="sm"
              variant="soft"
              :rounded="false"
            >
              {{ item.label }}
            </AppTag>
          </template>
        </AppStepper>
      </div>
    `,
  }),
}
