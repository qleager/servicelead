import type { Meta, StoryObj } from '@nuxtjs/storybook'
import AppTabs from '@components/app/Tabs.vue'
import AppTag from '@components/app/Tag.vue'

export default {
  title: 'App/Tabs',
  component: AppTabs,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    // Props
    color: {
      control: 'select',
      options: ['primary', 'neutral', 'white'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    items: {
      control: 'object',
    },
    // Slots
    listLeading: {
      control: 'boolean',
      name: 'List Leading',
    },
    listTrailing: {
      control: 'boolean',
      name: 'List Trailing',
    },
    leading: {
      control: 'boolean',
      name: 'Leading',
    },
    default: {
      control: 'boolean',
      name: 'Defualt',
    },
    trailing: {
      control: 'boolean',
      name: 'Trailing',
    },
    // Behavioral Props
    modelValue: {
      table: { category: 'Behavioral props' },
      control: { min: 0, max: 4, type: 'number' },
      description: 'Value or index of Item',
    },
  },
  args: {
    size: 'md',
    color: 'white',
    items: [
      { label: 'Все офферы', icon: 'offers', value: 0 },
      { label: 'Действует акция', value: 1 },
      { label: 'Топ офферы' },
      { label: 'Избранные' },
      { label: 'Новые', icon: 'jobs', trailingIcon: true },
    ],
    listLeading: false,
    listTrailing: false,
    leading: false,
    default: false,
    trailing: false,
    modelValue: 1,
  },
} satisfies Meta<typeof AppTabs>

type Story = StoryObj<typeof AppTabs>

export const Playground: Story = {
  render: args => ({
    components: { AppTabs, AppTag },
    setup: () => ({ args }),
    template: `
      <AppTabs
        v-model="args.modelValue"
        :color="args.color"
        :items="args.items"
        :size="args.size"
      >
        <template v-if="args.listLeading" #listLeading>
          <AppTag size="sm" color="gray" variant="soft" :rounded="false">List Leading Slot</AppTag>
        </template>
        <template v-if="args.leading" #leading>
          <AppTag size="sm" color="gray" variant="soft" :rounded="false">Leading Item Slot</AppTag>
        </template>
        <template v-if="args.default" #default>
          <AppTag size="sm" color="gray" variant="soft" :rounded="false">Default Item Slot</AppTag>
        </template>
        <template v-if="args.trailing" #trailing>
          <AppTag size="sm" color="gray" variant="soft" :rounded="false">Trailing Item Slot</AppTag>
        </template>
        <template v-if="args.listTrailing" #listTrailing>
          <AppTag size="sm" color="gray" variant="soft" :rounded="false">List Trailing Slot</AppTag>
        </template>
      </AppTabs>
    `,
  }),
}
