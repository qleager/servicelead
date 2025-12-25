<script lang="ts" setup>
import type { IconProps } from './Icon.vue'

interface Props {
  variant?: 'filled' | 'lined' | 'nofilled'
  color?: 'neutral' | 'white'
  icon?: IconProps['name']
  trailingIcon?: boolean
  size?: 'sm' | 'md' | 'lg'
  actionable?: boolean
  closable?: boolean
}

interface Emits {
  close: []
}

const ICON_SIZE_MAP = {
  sm: 12,
  md: 16,
  lg: 20,
} as const

const props = withDefaults(defineProps<Props>(), {
  variant: 'filled',
  color: 'neutral',
  size: 'md',
})

const emits = defineEmits<Emits>()

const classname = computed(() => ([
  'tag',
  `tag-variant-${props.variant}`,
  `tag-color-${props.color}`,
  `tag-size-${props.size}`,
  {
    'tag-icon': props.icon,
    'tag-icon-trailing': props.icon && props.trailingIcon,
  },
]))

const iconSize = computed(() => ICON_SIZE_MAP[props.size])
</script>

<template>
  <span :class="classname">
    <AppIcon
      v-if="icon"
      :name="icon"
      :size="iconSize"
      class="tag__icon"
    />
    <span class="tag__slot">
      <slot />
    </span>
    <AppIcon
      v-if="closable"
      class="tag__close"
      name="close_20"
      :size="iconSize"
      @click.stop="emits('close')"
    />
  </span>
</template>

<style lang="scss">
.tag {
  $this: &;
  $variant-filled: $this + '-variant-filled';
  $variant-lined: $this + '-variant-lined';
  $variant-nofilled: $this + '-variant-nofilled';
  $size-xs: $this + '-size-xs';
  $size-sm: $this + '-size-sm';
  $size-md: $this + '-size-md';
  $size-lg: $this + '-size-lg';
  $color-neutral: $this + '-color-neutral';
  $color-white: $this + '-color-white';
  $icon: $this + '-icon';
  $icon-trailing: $this + '-icon-trailing';

  cursor: default;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: fit-content;
  border-radius: 25px;

  &#{$variant-filled} {
    --variant-filled-text-color: inherit;

    color: var(--variant-filled-text-color) !important;
    background-color: transparent;
  }

  &#{$variant-lined} {
    border: 1px solid transparent;
    background-color: transparent !important;
  }

  &#{$variant-nofilled} {
    border: none !important;
    background-color: transparent !important;
  }

  &#{$color-neutral} {
    border-color: $color-neutral-light-300;
    color: inherit;
    background-color: $color-neutral-light-100;
  }

  &#{$color-white} {
    --variant-filled-text-color: $color-neutral-light-950;

    border-color: white;
    color: $color-neutral-light-50;
    background-color: white;
  }

  &#{$size-sm} {
    height: 16px;
    padding: 1px $space-2;

    @include text(regular, 2xs);
  }

  &#{$size-md} {
    height: 24px;
    padding: $space-05 $space-2;

    @include text(regular, xs);
  }

  &#{$size-lg} {
    height: 32px;
    padding: $space-05 $space-3;

    @include text(regular, base);
  }

  &#{icon-trailing} {
    justify-content: flex-end;
  }

  &__icon {
    flex-shrink: 0;
    margin-right: $space-1;

    #{$icon-trailing} & {
      order: 2;
      margin-right: 0;
      margin-left: $space-1;
    }
  }

  &__slot {
    order: 1;
    white-space: nowrap;

    @include text(regular, base);
  }

  &__close {
    cursor: pointer;
    order: 9;
    transition: $blur-duration-sm;

    &:hover {
      filter: invert(.5);
      transition: $hover-duration-sm;
    }

    &:active {
      transform: scale(.9);
      transition: $active-duration-sm;
    }
  }

  &:disabled {
    pointer-events: none;
  }
}
</style>
