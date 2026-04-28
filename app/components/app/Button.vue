<script lang="ts" setup>
import type { AnchorHTMLAttributes, VNodeChild } from 'vue'
import type { IconProps } from './Icon.vue'
import type { Color, Size, Subset } from '~/types/ds'

interface Props {
  color?: Subset<Color, 'neutral' | 'primary'> | 'white'
  disabled?: boolean
  icon?: IconProps['name']
  loading?: boolean
  rounded?: boolean
  size?: Size
  target?: AnchorHTMLAttributes['target']
  to?: RouteTo<true>
  trailingIcon?: boolean
  type?: 'button' | 'submit' | 'reset'
  value?: string | number
  variant?: 'solid' | 'outline' | 'link'
}

interface Slots {
  default: () => VNodeChild
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'solid',
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
  $variant-solid: $this + '-variant-solid';
  $variant-outline: $this + '-variant-outline';
  $variant-link: $this + '-variant-link';

  ///
  $primary-color: $this + '-color-primary';
  $white-color: $this + '-color-white';
  $neutral-color: $this + '-color-neutral';

  ///
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

  &:disabled {
    pointer-events: none;
  }

  @include is($rounded) {
    border-radius: 50px !important;
  }

  @include is($size-xs) {
    gap: $space-2;

    min-width: 32px;
    height: 32px;
    padding-inline: $space-3;
    border-radius: $radius-2;

    @include text(regular, xs);
  }

  @include is($size-sm) {
    gap: $space-3;

    min-width: 40px;
    height: 40px;
    padding-inline: $space-4;
    border-radius: $radius-2;

    @include text(regular, sm);
  }

  @include is($size-md) {
    gap: $space-4;

    min-width: 48px;
    height: 48px;
    padding-inline: $space-5;
    border-radius: $radius-2;

    @include text(regular, md);
  }

  @include is($size-lg) {
    gap: $space-5;

    min-width: 56px;
    height: 56px;
    padding-inline: $space-6;
    border-radius: $radius-3;

    @include text(regular, md);
  }

  @include is($variant-solid) {
    border: 1px solid transparent;
    background-color: inherit;
  }

  @include is($variant-outline) {
    border: 1px solid transparent;
    background-color: none;
  }

  @include is($variant-link) {
    border: none;
    background-color: none;
  }

  @include is($primary-color + $variant-solid) {
    color: white;
    background-color: $color-primary;

    &:hover {
      background-color: $color-primary-600;
    }

    &:active {
      background-color: $color-primary-700;
    }

    &:disabled {
      background-color: $color-primary-300;
    }
  }

  @include is($primary-color + $variant-outline) {
    border-color: $color-primary;
    color: $color-primary;

    &:hover {
      border-color: $color-primary;
      color: white;
      background-color: $color-primary;
    }

    &:active {
      border-color: $color-primary-700;
      color: white;
    }

    &:disabled {
      border-color: $color-primary-300;
      color: $color-primary-300;
    }
  }

  @include is($primary-color + $variant-link) {
    color: $color-primary;

    &:hover {
      color: $color-primary-600;
    }

    &:active {
      color: $color-primary-700;
    }

    &:disabled {
      color: $color-primary-300;
    }
  }

  @include is($white-color + $variant-solid) {
    color: inherit;
    background-color: white;

    &:hover {
      background-color: $color-neutral-100;
    }

    &:active {
      background-color: $color-neutral-150;
    }

    &:disabled {
      color: $color-neutral-300;
    }
  }

  @include is($white-color + $variant-outline) {
    border-color: white;
    color: white;

    &:hover {
      border-color: transparent;
      color: inherit;
      background-color: white;
    }

    &:active {
      border-color: transparent;
      color: $color-neutral-950;
      background-color: $color-neutral-150;
    }

    &:disabled {
      border-color: white;
      color: $color-neutral;
    }
  }

  @include is($white-color + $variant-link) {
    color: white;

    &:hover {
      color: $color-neutral-150;
    }

    &:active {
      border-color: transparent;
      color: $color-neutral-200;
    }

    &:disabled {
      color: $color-neutral-50;
    }
  }

  @include is($neutral-color + $variant-solid) {
    background-color: $color-neutral-100;

    &:hover {
      background-color: $color-neutral-150;
    }

    &:active {
      background-color: $color-neutral-200;
    }

    &:disabled {
      color: $color-neutral-300;
      background-color: $color-neutral-50;
    }
  }

  @include is($neutral-color + $variant-outline) {
    border-color: $color-neutral-300;

    &:hover {
      border-color: transparent;
      background-color: white;
    }

    &:active {
      background-color: $color-neutral-100;
    }

    &:disabled {
      border-color: $color-neutral-200;
      color: $color-neutral-300;
    }
  }

  @include is($neutral-color + $variant-link) {
    color: $color-neutral-400;

    &:hover {
      color: $color-neutral;
    }

    &:active {
      color: $color-neutral-600;
    }

    &:disabled {
      color: $color-neutral-200;
    }
  }

  @include is($trailing-icon) {
    flex-direction: row-reverse;
  }

  @include is($without-slot) {
    justify-content: center;
    aspect-ratio: 1;
    padding: 0;
  }

  &__icon {
    @include is($size-xs) {
      width: 16px;
      height: 16px;
      margin-inline: -#{$space-05};
    }

    @include is($size-sm) {
      width: 20px;
      height: 20px;
      margin-inline: -#{$space-1};
    }

    @include is($size-md) {
      width: 24px;
      height: 24px;
      margin-inline: -#{$space-2};
    }

    @include is($size-lg) {
      width: 28px;
      height: 28px;
      margin-inline: -#{$space-3};
    }

    @include is($loading) {
      animation: clockwiseRotate 1s linear infinite;
    }
  }
}
</style>
