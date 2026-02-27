<script lang="ts" setup>
import type { AnchorHTMLAttributes, VNodeChild } from 'vue'
import type { IconProps } from './Icon.vue'
import type { Colors, Sizes, Subset } from '~/types/ds'

interface Props {
  color?: Subset<Colors, 'neutral' | 'primary'> | 'white'
  disabled?: boolean
  icon?: IconProps['name']
  loading?: boolean
  rounded?: boolean
  size?: Sizes
  target?: AnchorHTMLAttributes['target']
  to?: RouteTo<true>
  trailingIcon?: boolean
  type?: 'button' | 'submit' | 'reset'
  value?: string | number
  variant?: 'filled' | 'lined' | 'nofilled'
}

interface Slots {
  default: () => VNodeChild
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'filled',
  size: 'md',
  rounded: true,
  color: 'primary',
  type: 'button',
})

const slots = defineSlots<Slots>()

const tag = computed(() =>
  props.to ? 'a' : 'button',
)

const isIconVisible = computed(() =>
  props.icon || props.loading,
)

const iconName = computed(() =>
  props.loading ? 'change' : props.icon,
)

const classname = computed(() => [
  'button',
  `button-variant-${props.variant}`,
  `button-color-${props.color}`,
  `button-size-${props.size}`,
  { 'button-trailing-icon': props.trailingIcon },
  { 'button-rounded': props.rounded },
  { 'button-loading': props.loading },
  { 'button-without-slot': !slots.default },
])

export type { Props as ButtonProps }
</script>

<template>
  <component
    :is="tag"
    :class="classname"
    :disabled="disabled || loading"
    :href="to"
    :to
    :type
    :value
  >
    <AppIcon
      v-if="isIconVisible"
      class="button__icon"
      :name="iconName!"
    />
    <slot />
  </component>
</template>

<style lang="scss">
@use 'sass:color';

.button {
  $this: &;

  ///
  $variant-filled: $this + '-variant-filled';
  $variant-lined: $this + '-variant-lined';
  $variant-nofilled: $this + '-variant-nofilled';

  ///
  $primary-color: $this + '-color-primary';
  $white-color: $this + '-color-white';
  $neutral-color: $this + '-color-neutral';

  ///
  $size-3xs: $this + '-size-3xs';
  $size-xxs: $this + '-size-xxs';
  $size-xs: $this + '-size-xs';
  $size-sm: $this + '-size-sm';
  $size-md: $this + '-size-md';
  $size-lg: $this + '-size-lg';
  $trailing-icon: $this + '-trailing-icon';
  $disabled: & + '-disabled';
  $rounded: & + '-rounded';
  $loading: & + '-loading';
  $without-slot: & + '-without-slot';

  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: space-between;

  width: fit-content;

  transition: $blur-duration-sm;

  &:hover {
    transition: $hover-duration-sm;
  }

  &:active {
    transition: $active-duration-sm;
  }

  &#{$rounded} {
    border-radius: 50px !important;
  }

  &#{$size-xs} {
    gap: $space-2;
    height: 32px;
    padding-inline: $space-3;
    border-radius: $radius-2;

    @include text(regular, xs);
  }

  &#{$size-sm} {
    gap: $space-3;
    height: 40px;
    padding-inline: $space-4;
    border-radius: $radius-2;

    @include text(regular, sm);
  }

  &#{$size-md} {
    gap: $space-4;
    height: 48px;
    padding-inline: $space-5;
    border-radius: $radius-2;

    @include text(regular, md);
  }

  &#{$size-lg} {
    gap: $space-5;
    height: 56px;
    padding-inline: $space-6;
    border-radius: $radius-3;

    @include text(regular, md);
  }

  &#{$variant-filled} {
    --variant-filled-text-color: inherit;
    --variant-filled-background-color: inherit;

    border: 1px solid transparent !important;
    color: var(--variant-filled-text-color);
    background-color: var(--variant-filled-background-color);
  }

  &#{$variant-lined} {
    --variant-lined-background-color: inherit;
    --variant-lined-text-color: inherit;

    border: 1px solid transparent;
    color: var(--variant-lined-text-color) ;
    background-color: var(--variant-lined-background-color);
  }

  &#{$variant-nofilled} {
    --variant-nofilled-text-color: inherit;

    border: none !important;
    color: var(--variant-nofilled-text-color);
    background-color: var(--variant-nofilled-background-color) !important;
  }

  &#{$primary-color} {
    --variant-filled-text-color: white;
    --variant-filled-background-color: #{$color-primary};
    --variant-nofilled-text-color: #{$color-primary};
    --variant-lined-text-color: #{$color-primary};

    border-color: $color-primary;

    &:hover {
      --variant-lined-text-color: white;
      --variant-filled-background-color: #{$color-primary-600};
      --variant-nofilled-text-color: #{$color-primary-600};
      --variant-lined-background-color: #{$color-primary};

      border-color: $color-primary-600;
    }

    &:active {
      --variant-nofilled-text-color: #{$color-primary-700};
      --variant-filled-background-color: #{$color-primary-700};
      --variant-lined-background-color: #{$color-primary-700};

      border-color: #{$color-primary-700};
    }

    &:disabled {
      cursor: not-allowed;

      --variant-nofilled-text-color: #{$color-primary-400};
      --variant-filled-text-color: #{rgb(white, .8)};
      --variant-filled-background-color: #{$color-primary-400};
      --variant-lined-background-color: #{$color-primary-400};
      --variant-lined-text-color: #{rgb(white, .8)};

      border-color: #{$color-primary-400};
    }
  }

  &#{$white-color} {
    --variant-filled-background-color: white;
    --variant-filled-text-color: #{$color-neutral-950};
    --variant-lined-text-color: white;
    --variant-nofilled-background-color: transparent;
    --variant-nofilled-text-color: white;

    border-color: white;

    &:hover {
      --variant-filled-background-color: #{$color-neutral-100};
      --variant-nofilled-background-color: white;
      --variant-lined-background-color: white;
      --variant-lined-text-color: #{$color-neutral-950};

      border-color: #{$color-neutral-50};
      color: #{$color-neutral-950};
    }

    &:active {
      --variant-filled-background-color: #{$color-neutral-150};
      --variant-nofilled-background-color: #{$color-neutral-100};
      --variant-lined-background-color: #{$color-neutral-100};

      border-color: #{$color-neutral-150};
      color: #{$color-neutral-950};
    }

    &:disabled {
      cursor: not-allowed;

      --variant-nofilled-background-color: white;
      --variant-filled-background-color: white;
      --variant-lined-background-color: white;

      border-color: white;
      color: #{$color-neutral};
    }
  }

  &#{$neutral-color} {
    --variant-filled-text-color: #{$color-neutral-950};
    --variant-filled-background-color: #{$color-neutral-100};
    --variant-lined-text-color: #{$color-neutral-950};
    --variant-nofilled-text-color: #{$color-neutral-400};

    border-color: $color-neutral-300;

    &:hover {
      --variant-filled-background-color: #{$color-neutral-150};
      --variant-lined-background-color: white;
      --variant-nofilled-text-color: #{$color-neutral};

      border-color: white;
    }

    &:active {
      --variant-filled-background-color: #{$color-neutral-200};
      --variant-lined-background-color: #{$color-neutral-100};
      --variant-nofilled-text-color: #{$color-neutral-600};

      border-color: $color-neutral-100;
    }

    &:disabled {
      cursor: not-allowed;
      border-color: #{$color-neutral-50};

      --variant-nofilled-text-color: #{$color-neutral-300};
      --variant-filled-text-color: #{$color-neutral-600};
      --variant-lined-text-color: #{$color-neutral-600};
      --variant-filled-background-color: #{$color-neutral-100};
      --variant-lined-background-color: white;
    }
  }

  &#{$trailing-icon} {
    flex-direction: row-reverse;
  }

  &#{$without-slot} {
    justify-content: center;
    aspect-ratio: 1;
    padding: 0;
  }

  &__icon {
    #{$size-xs} & {
      width: 16px;
      height: 16px;
      margin-inline: -#{$space-05};
    }

    #{$size-sm} & {
      width: 20px;
      height: 20px;
      margin-inline: -#{$space-1};
    }

    #{$size-md} & {
      width: 24px;
      height: 24px;
      margin-inline: -#{$space-2};
    }

    #{$size-lg} & {
      width: 28px;
      height: 28px;
      margin-inline: -#{$space-3};
    }

    #{$loading} & {
      animation: clockwiseRotate 1s linear infinite;
    }
  }

  &__slot:empty {
    display: none;
  }
}
</style>
