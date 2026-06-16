import type { Meta, StoryObj } from '@nuxtjs/storybook'
import type { ComponentProps } from 'vue-component-type-helpers'
import type { ChipProps } from '@components/app/Chip.vue'
import { computed } from 'vue'
import AppAvatar from '@components/app/Avatar.vue'
import { iconNames } from '../helpers/icon-names'

type AvatarProps = ComponentProps<typeof AppAvatar>
type AvatarStoryArgs = Omit<AvatarProps, 'chip'> & {
  chip: boolean
  chipColor: ChipProps['color']
  chipPosition: ChipProps['position']
  chipText: ChipProps['text']
  chipVariant: ChipProps['variant']
}

const meta = {
  title: 'App/Avatar',
  component: AppAvatar,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    // Props
    alt: {
      control: 'text',
    },
    chip: {
      control: 'boolean',
    },
    icon: {
      control: 'select',
      options: [null, ...iconNames],
    },
    size: {
      control: 'select',
      options: ['3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
    },
    src: {
      control: 'text',
    },
    text: {
      control: 'text',
    },
    // Chip Props
    chipColor: {
      name: 'color',
      control: 'select',
      options: ['primary', 'neutral', 'gray', 'red', 'yellow', 'green', 'blue', 'purple'],
      table: { category: 'chip props' },
    },
    chipPosition: {
      name: 'position',
      control: 'select',
      options: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
      table: { category: 'chip props' },
    },
    chipText: {
      name: 'text',
      control: 'text',
      table: { category: 'chip props' },
    },
    chipVariant: {
      name: 'variant',
      control: 'select',
      options: ['solid', 'soft'],
      table: { category: 'chip props' },
    },
  },
  args: {
    alt: 'Ivan Petrov',
    chip: false,
    icon: 'main_menu_account',
    size: 'md',
    src: '',
    text: '',
    chipColor: 'primary',
    chipPosition: 'top-right',
    chipText: undefined,
    chipVariant: 'solid',
  },
} satisfies Meta<AvatarStoryArgs>

export default meta

type Story = StoryObj<AvatarStoryArgs>

export const Playground: Story = {
  render: (args: AvatarStoryArgs) => ({
    components: { AppAvatar },
    setup: () => {
      const chip = computed(() => {
        if (!args.chip) {
          return false
        }

        return {
          color: args.chipColor,
          position: args.chipPosition,
          text: args.chipText,
          variant: args.chipVariant,
        }
      })

      return { args, chip }
    },
    template: `
      <AppAvatar
        :alt="args.alt"
        :chip="chip"
        :icon="args.icon"
        :size="args.size"
        :src="args.src"
        :text="args.text"
      />
    `,
  }),
}
