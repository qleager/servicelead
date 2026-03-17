<script lang="ts" setup>
import type { Color, Size } from '~/types/ds'
import type { IconProps } from './Icon.vue'
import type { VNodeChild } from 'vue'

interface Props {
  actionable?: boolean
  closable?: boolean
  color?: Color | 'white'
  icon?: IconProps['name']
  rounded?: boolean
  size?: Size
  trailingIcon?: boolean
  variant?: 'filled' | 'soft' | 'lined' | 'nofilled'
}

interface Emits {
  close: []
}

interface Slots {
  default: () => VNodeChild
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'filled',
  color: 'primary',
  size: 'md',
  rounded: true,
})

const emits = defineEmits<Emits>()

defineSlots<Slots>()

const classname = computed(() => ([
  'tag',
  `tag-variant-${props.variant}`,
  `tag-color-${props.color}`,
  `tag-size-${props.size}`,
  {
    'tag-icon': props.icon,
    'tag-actionable': props.actionable,
    'tag-rounded': props.rounded,
    'tag-icon-trailing': props.icon && props.trailingIcon,
  },
]))
</script>

<template>
  <span :class="classname">
    <AppIcon
      v-if="icon"
      class="tag__icon"
      :name="icon"
    />
    <slot />
    <AppIcon
      v-if="closable"
      class="tag__close"
      name="close_20"
      @click.stop="emits('close')"
    />
  </span>
</template>

<style lang="scss">
.tag {
  $this: &;
  $variant-filled: $this + '-variant-filled';
  $variant-soft: $this + '-variant-soft';
  $variant-lined: $this + '-variant-lined';
  $variant-nofilled: $this + '-variant-nofilled';
  $size-xs: $this + '-size-xs';
  $size-sm: $this + '-size-sm';
  $size-md: $this + '-size-md';
  $size-lg: $this + '-size-lg';
  $actionable: $this + '-actionable';
  $rounded: $this + '-rounded';
  $white-color: $this + '-color-white';
  $primary-color: $this + '-color-primary';
  $neutral-color: $this + '-color-neutral';
  $gray-color: $this + '-color-gray';
  $red-color: $this + '-color-red';
  $yellow-color: $this + '-color-yellow';
  $green-color: $this + '-color-green';
  $blue-color: $this + '-color-blue';
  $purple-color: $this + '-color-purple';
  $icon: $this + '-icon';
  $icon-trailing: $this + '-icon-trailing';

  cursor: default;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &#{$rounded} {
    border-radius: 50px !important;
  }

  &#{$variant-filled} {
    --variant-filled-text-color: inherit;
    --variant-filled-background-color: transparent;

    color: var(--variant-filled-text-color);
    background-color: var(--variant-filled-background-color) !important;
  }

  &#{$variant-soft} {
    --variant-soft-text-color: inherit;
    --variant-soft-background-color: transparent;

    color: var(--variant-soft-text-color);
    background-color: var(--variant-soft-background-color) !important;
  }

  &#{$variant-lined} {
    --variant-lined-text-color: unset;
    --variant-lined-background-color: transparent;

    border: 1px solid transparent;
    color: var(--variant-lined-text-color);
    background-color: var(--variant-lined-background-color) !important;
  }

  &#{$variant-nofilled} {
    --variant-nofilled-text-color: inherit;

    border: none !important;
    color: var(--variant-nofilled-text-color) ;
    background-color: transparent !important;
  }

  &#{$actionable} {
    cursor: pointer;
    background-color: inherit;
    transition: $blur-duration-sm;
  }

  &#{$white-color} {
    --variant-filled-background-color: white;
    --variant-lined-text-color: white;
    --variant-filled-text-color: #{$color-neutral-950};
    --variant-nofilled-text-color: white;
    --variant-soft-text-color: #{$color-neutral-700};
    --variant-soft-background-color: #{rgb(white, .05)};

    border-color: white;
    background-color: white;

    &:is(#{$actionable}):hover {
      --variant-lined-text-color: #{$color-neutral-950};
      --variant-filled-background-color: #{$color-neutral-100};
      --variant-lined-background-color: white;
      --variant-soft-background-color: #{$color-neutral-50};

      border-color: #{$color-neutral-50};
    }

    &:is(#{$actionable}):active {
      --variant-lined-text-color: #{$color-neutral-950};
      --variant-filled-background-color: #{$color-neutral-150};
      --variant-lined-background-color: #{$color-neutral-100};
      --variant-soft-background-color: #{$color-neutral-100};

      border-color: #{$color-neutral-150};
    }
  }

  &#{$primary-color} {
    --variant-filled-background-color: #{$color-primary};
    --variant-filled-text-color: white;
    --variant-lined-text-color: #{$color-primary};
    --variant-nofilled-text-color: #{$color-primary};
    --variant-soft-text-color: #{$color-primary-700};
    --variant-soft-background-color: #{$color-primary-50};

    border-color: $color-primary;
    background-color: $color-primary;

    &:is(#{$actionable}):hover {
      --variant-lined-text-color: white;
      --variant-filled-background-color: #{$color-primary-600};
      --variant-nofilled-text-color: #{$color-primary-600};
      --variant-lined-background-color: #{$color-primary};
      --variant-soft-background-color: #{$color-primary-100};

      border-color: $color-primary-600;
    }

    &:is(#{$actionable}):active {
      --variant-nofilled-text-color: #{$color-primary-700};
      --variant-filled-background-color: #{$color-primary-700};
      --variant-lined-background-color: #{$color-primary-600};
      --variant-soft-background-color: #{$color-primary-200};

      border-color: #{$color-primary-700};
    }
  }

  &#{$neutral-color} {
    --variant-filled-background-color: #{$color-neutral-100};
    --variant-lined-text-color: #{$color-neutral-950};
    --variant-nofilled-text-color: #{$color-neutral-400};
    --variant-soft-text-color: #{$color-neutral-700};
    --variant-soft-background-color: #{$color-neutral-50};

    border-color: $color-neutral-300;

    &:is(#{$actionable}):hover {
      --variant-filled-background-color: #{$color-neutral-150};
      --variant-nofilled-text-color: #{$color-neutral};
      --variant-lined-background-color: white;
      --variant-soft-background-color: #{$color-neutral-100};

      border-color: white;
    }

    &:is(#{$actionable}):active {
      --variant-nofilled-text-color: #{$color-neutral-600};
      --variant-filled-background-color: #{$color-neutral-200};
      --variant-lined-background-color: #{$color-neutral-100};
      --variant-soft-background-color: #{$color-neutral-200};

      border-color: #{$color-neutral-100};
    }
  }

  &#{$gray-color} {
    --variant-filled-background-color: #{$color-gray-100};
    --variant-lined-text-color: #{$color-gray-950};
    --variant-nofilled-text-color: #{$color-gray-400};
    --variant-soft-text-color: #{$color-gray-700};
    --variant-soft-background-color: #{$color-gray-50};

    border-color: $color-gray-300;

    &:is(#{$actionable}):hover {
      --variant-filled-background-color: #{$color-gray-150};
      --variant-nofilled-text-color: #{$color-gray};
      --variant-lined-background-color: white;
      --variant-soft-background-color: #{$color-gray-100};

      border-color: white;
    }

    &:is(#{$actionable}):active {
      --variant-nofilled-text-color: #{$color-gray-600};
      --variant-filled-background-color: #{$color-gray-200};
      --variant-lined-background-color: #{$color-gray-100};
      --variant-soft-background-color: #{$color-gray-200};

      border-color: #{$color-gray-100};
    }
  }

  &#{$red-color} {
    --variant-filled-background-color: #{$color-red};
    --variant-filled-text-color: white;
    --variant-lined-text-color: #{$color-red};
    --variant-nofilled-text-color: #{$color-red};
    --variant-soft-text-color: #{$color-red-700};
    --variant-soft-background-color: #{$color-red-50};

    border-color: $color-red;

    &:is(#{$actionable}):hover {
      --variant-lined-text-color: white;
      --variant-filled-background-color: #{$color-red-600};
      --variant-nofilled-text-color: #{$color-red-600};
      --variant-lined-background-color: #{$color-red};
      --variant-soft-background-color: #{$color-red-100};

      border-color: $color-red;
    }

    &:is(#{$actionable}):active {
      --variant-nofilled-text-color: #{$color-red-700};
      --variant-filled-background-color: #{$color-red-700};
      --variant-lined-background-color: #{$color-red-600};
      --variant-soft-background-color: #{$color-red-200};

      border-color: $color-red-600;
    }
  }

  &#{$yellow-color} {
    --variant-filled-background-color: #{$color-yellow};
    --variant-filled-text-color: white;
    --variant-lined-text-color: #{$color-yellow};
    --variant-nofilled-text-color: #{$color-yellow};
    --variant-soft-text-color: #{$color-yellow-700};
    --variant-soft-background-color: #{$color-yellow-50};

    border-color: $color-yellow;

    &:is(#{$actionable}):hover {
      --variant-lined-text-color: white;
      --variant-filled-background-color: #{$color-yellow-600};
      --variant-nofilled-text-color: #{$color-yellow-600};
      --variant-lined-background-color: #{$color-yellow};
      --variant-soft-background-color: #{$color-yellow-100};

      border-color: $color-yellow;
    }

    &:is(#{$actionable}):active {
      --variant-nofilled-text-color: #{$color-yellow-700};
      --variant-filled-background-color: #{$color-yellow-700};
      --variant-lined-background-color: #{$color-yellow-600};
      --variant-soft-background-color: #{$color-yellow-200};

      border-color: $color-yellow-600;
    }
  }

  &#{$green-color} {
    --variant-filled-background-color: #{$color-green};
    --variant-filled-text-color: white;
    --variant-lined-text-color: #{$color-green};
    --variant-nofilled-text-color: #{$color-green};
    --variant-soft-text-color: #{$color-green-700};
    --variant-soft-background-color: #{$color-green-50};

    border-color: $color-green;

    &:is(#{$actionable}):hover {
      --variant-lined-text-color: white;
      --variant-filled-background-color: #{$color-green-600};
      --variant-nofilled-text-color: #{$color-green-600};
      --variant-lined-background-color: #{$color-green};
      --variant-soft-background-color: #{$color-green-100};

      border-color: $color-green;
    }

    &:is(#{$actionable}):active {
      --variant-nofilled-text-color: #{$color-green-700};
      --variant-filled-background-color: #{$color-green-700};
      --variant-lined-background-color: #{$color-green-600};
      --variant-soft-background-color: #{$color-green-200};

      border-color: $color-green-600;
    }
  }

  &#{$blue-color} {
    --variant-filled-background-color: #{$color-blue};
    --variant-filled-text-color: white;
    --variant-lined-text-color: #{$color-blue};
    --variant-nofilled-text-color: #{$color-blue};
    --variant-soft-text-color: #{$color-blue-700};
    --variant-soft-background-color: #{$color-blue-50};

    border-color: $color-blue;

    &:is(#{$actionable}):hover {
      --variant-lined-text-color: white;
      --variant-filled-background-color: #{$color-blue-600};
      --variant-nofilled-text-color: #{$color-blue-600};
      --variant-lined-background-color: #{$color-blue};
      --variant-soft-background-color: #{$color-blue-100};

      border-color: $color-blue;
    }

    &:is(#{$actionable}):active {
      --variant-nofilled-text-color: #{$color-blue-700};
      --variant-filled-background-color: #{$color-blue-700};
      --variant-lined-background-color: #{$color-blue-600};
      --variant-soft-background-color: #{$color-blue-200};

      border-color: $color-blue-600;
    }
  }

  &#{$purple-color} {
    --variant-filled-background-color: #{$color-purple};
    --variant-filled-text-color: white;
    --variant-lined-text-color: #{$color-purple};
    --variant-nofilled-text-color: #{$color-purple};
    --variant-soft-text-color: #{$color-purple-700};
    --variant-soft-background-color: #{$color-purple-50};

    border-color: $color-purple;

    &:is(#{$actionable}):hover {
      --variant-lined-text-color: white;
      --variant-filled-background-color: #{$color-purple-600};
      --variant-nofilled-text-color: #{$color-purple-600};
      --variant-lined-background-color: #{$color-purple};
      --variant-soft-background-color: #{$color-purple-100};

      border-color: $color-purple;
    }

    &:is(#{$actionable}):active {
      --variant-nofilled-text-color: #{$color-purple-700};
      --variant-filled-background-color: #{$color-purple-700};
      --variant-lined-background-color: #{$color-purple-600};
      --variant-soft-background-color: #{$color-purple-200};

      border-color: $color-purple-600;
    }
  }

  &#{$size-xs} {
    gap: $space-1;

    min-width: 16px;
    height: 16px;
    padding-inline: $space-1;
    border-radius: $radius-1;

    @include text(regular, 2xs);
  }

  &#{$size-sm} {
    gap: $space-1;

    min-width: 24px;
    height: 24px;
    padding-inline: $space-2;
    border-radius: $radius-2;

    @include text(regular, xs);
  }

  &#{$size-md} {
    gap: $space-2;

    min-width: 32px;
    height: 32px;
    padding-inline: $space-3;
    border-radius: $radius-2;

    @include text(regular, xs);
  }

  &#{$size-lg} {
    gap: $space-3;

    min-width: 40px;
    height: 40px;
    padding-inline: $space-4;
    border-radius: $radius-2;

    @include text(regular, sm);
  }

  &#{icon-trailing} {
    justify-content: flex-end;
  }

  &__icon {
    flex-shrink: 0;

    #{$size-xs} & {
      width: 12px;
      height: 12px;
    }

    #{$size-sm} & {
      width: 16px;
      height: 16px;
      margin-inline: -#{$space-05};
    }

    #{$size-md} & {
      width: 16px;
      height: 16px;
      margin-inline: -#{$space-1};
    }

    #{$size-lg} & {
      width: 20px;
      height: 20px;
      margin-inline: -#{$space-2};
    }

    #{$icon-trailing} & {
      order: 2;
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

    #{$size-xs} & {
      width: 14px;
      height: 14px;
    }

    #{$size-sm} & {
      width: 16px;
      height: 16px;
      margin-inline: -#{$space-05};
    }

    #{$size-md} & {
      width: 20px;
      height: 20px;
      margin-inline: -#{$space-1};
    }

    #{$size-lg} & {
      width: 24px;
      height: 24px;
      margin-inline: -#{$space-2};
    }

    &:hover {
      filter: opacity(.8);
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
