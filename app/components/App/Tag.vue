<script lang="ts" setup>
import type { IconProps } from './Icon.vue'

interface Props {
  variant?: 'filled' | 'lined' | 'nofilled'
  color?: 'neutral'
  icon?: IconProps['name']
  trailingIcon?: boolean
  size?: 'xs' | 'sm' | 'md'
  
}

const ICON_SIZE_MAP = {
  xs: 12,
  sm: 20,
  md: 28,
} as const


const props = withDefaults(defineProps<Props>(), {
  variant: 'filled',
  color: 'neutral',
  size: 'md',  
})

const classname = computed(() => ([
  'tag',
  `tag-variant-${props.variant}`,
  `tag-color-${props.color}`,
  `tag-size-${props.size}`,
  {
    'tag-icon': props.icon,
    'tag-icon-trailing': props.icon && props.trailingIcon,
  }
]))

const iconSize = computed(() => ICON_SIZE_MAP[props.size] ?? ICON_SIZE_MAP.md)
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
  $color-neutral: $this + '-color-neutral';
  $icon: $this + '-icon';
  $icon-trailing: $this + '-icon-trailing';

  cursor: default;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: fit-content;
  height: 32px;
  border-radius: 25px;

  &#{$color-neutral} {
    color: black;
  }

  &#{$size-xs} {
    height: 16px;
    padding: 1px $space-2;

    @include text(regular, 2xs);
  }

  &#{$size-sm} {
    height: 24px;
    padding: $space-05 $space-2;

    @include text(regular, xs);
  }

  &#{$size-md} {
    height: 32px;
    padding: $space-05 $space-3;

    @include text(regular, base);
  }

  &#{$variant-filled} {
    background-color: white;

    &:hover {
      border: 1px solid $color-neutral-light-300;
    }

    &:active {
      color: $color-neutral-light-700
    }

    &:disabled {
      color: $color-neutral-light-500
    }
  }

  &#{$variant-lined} {
    border: 1px solid $color-neutral-light-200;
    background-color: transparent;
  }

  &#{$variant-nofilled} {
    border: none;
    background-color: transparent;
  }

  &#{$variant-lined}, &#{$variant-nofilled} {
    &:active {
      color: $color-neutral-light-700
    }

    &:disabled {
      color: $color-neutral-light-400
    }
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

  &:disabled {
    pointer-events: none;
  }
}
</style>
