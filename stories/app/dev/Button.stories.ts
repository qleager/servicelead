import { computed } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'
// Important: Use path as ~/..., not @alias/... it is crash storybook build
import AppButton from '~/components/app/Button.vue'
import { baseMeta } from '../Button.meta'

const meta: Meta<typeof AppButton> = {
  ...baseMeta,
  title: 'App/Dev/Button',
}

export default meta

type Story = StoryObj<typeof AppButton>

const renderWithLabel = (args: Record<string, unknown>) => ({
  components: { AppButton },
  setup() {
    const buttonArgs = computed(() => {
      const { label, ...rest } = args as Record<string, unknown>
      return rest
    })

    return { args, buttonArgs }
  },
  template: '<AppButton v-bind="buttonArgs">{{ args.label }}</AppButton>',
})

export const Playground: Story = {
  render: renderWithLabel,
}

export const WithIcon: Story = {
  render: renderWithLabel,
  args: {
    icon: 'plus',
  },
}

export const TrailingIcon: Story = {
  render: renderWithLabel,
  args: {
    icon: 'arrow_right',
    trailingIcon: true,
  },
  parameters: {
    controls: { exclude: ['trailingIcon'] },
  },
}

export const Loading: Story = {
  render: renderWithLabel,
  args: {
    loading: true,
  },
}

export const Disabled: Story = {
  render: renderWithLabel,
  args: {
    disabled: true,
  },
}

export const AsLink: Story = {
  render: renderWithLabel,
  args: {
    // to: 'https://example.com',
    target: '_blank',
    variant: 'nofilled',
    color: 'neutral',
  },
}

export const IconOnly: Story = {
  render: (args: Record<string, unknown>) => ({
    components: { AppButton },
    setup() {
      const buttonArgs = computed(() => {
        const { label, ...rest } = args as Record<string, unknown>
        return rest
      })

      return { buttonArgs }
    },
    template: '<AppButton v-bind="buttonArgs" />',
  }),
  args: {
    icon: 'plus',
    size: 'md',
  },
}

export const Variants: Story = {
  render: () => ({
    components: { AppButton },
    setup() {
      const variants = ['filled', 'lined', 'nofilled'] as const
      return { variants }
    },
    template: `
      <div style="display: grid; gap: 12px; align-items: start;">
        <AppButton
          v-for="variant in variants"
          :key="variant"
          :variant="variant"
        >
          {{ variant }}
        </AppButton>
      </div>
    `,
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { AppButton },
    setup() {
      const sizes = ['xs', 'sm', 'md', 'lg'] as const
      return { sizes }
    },
    template: `
      <div style="display: grid; gap: 12px; align-items: center;">
        <AppButton
          v-for="size in sizes"
          :key="size"
          :size="size"
        >
          {{ size }}
        </AppButton>
      </div>
    `,
  }),
}

export const Colors: Story = {
  render: () => ({
    components: { AppButton },
    setup() {
      const colors = ['primary', 'neutral', 'white'] as const
      return { colors }
    },
    template: `
      <div style="display: grid; gap: 12px; align-items: center; background: #1f2937; padding: 16px; border-radius: 12px;">
        <AppButton
          v-for="color in colors"
          :key="color"
          :color="color"
        >
          {{ color }}
        </AppButton>
      </div>
    `,
  }),
  parameters: {
    backgrounds: { default: 'dark' },
  },
}
