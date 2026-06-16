<script lang="ts" setup>
import type { Color, Size } from '~/types/ds'

interface Props {
  color?: Color
  inset?: boolean
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  size?: Size
  standalone?: boolean
  text?: string
  variant?: 'solid' | 'soft'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'solid',
  color: 'primary',
  size: 'md',
  position: 'top-right',
})

const classname = computed(() => [
  'chip',
  `chip-variant-${props.variant}`,
  `chip-color-${props.color}`,
  `chip-size-${props.size}`,
  `chip-position-${props.position}`,
  {
    'chip-inset': props.inset,
    'chip-standalone': props.standalone,
  },
])

export type { Props as ChipProps }
</script>

<template>
  <div :class="classname">
    <span class="chip__bullet">
      <div class="chip__slot chip__slot-content">
        <slot name="content">
          {{ text }}
        </slot>
      </div>
    </span>
    <slot />
  </div>
</template>

<style lang="scss">
.chip {
  $this: &;
  $variant-solid: $this + '-variant-solid';
  $variant-soft: $this + '-variant-soft';
  $inset: $this + '-inset';
  $standalone: $this + '-standalone';

  // positions
  $position-top-right: $this + '-position-top-right';
  $position-top-left: $this + '-position-top-left';
  $position-bottom-right: $this + '-position-bottom-right';
  $position-bottom-left: $this + '-position-bottom-left';

  // sizes
  $size-xs: $this + '-size-xs';
  $size-sm: $this + '-size-sm';
  $size-md: $this + '-size-md';
  $size-lg: $this + '-size-lg';

  // colors
  $primary-color: $this + '-color-primary';
  $neutral-color: $this + '-color-neutral';
  $gray-color: $this + '-color-gray';
  $red-color: $this + '-color-red';
  $yellow-color: $this + '-color-yellow';
  $green-color: $this + '-color-green';
  $blue-color: $this + '-color-blue';
  $purple-color: $this + '-color-purple';

  position: relative;
  display: inline-flex;
  align-items: center;

  &#{$standalone} {
    gap: $space-2;
  }

  &__bullet {
    user-select: none;

    position: absolute;
    z-index: 1;

    display: inline-flex;
    align-items: center;
    justify-content: center;

    width: fit-content;
    border-radius: $radius-8;

    white-space: nowrap;

    @include is($variant-soft) {
      &::before {
        content: "";

        position: absolute;

        width: 100%;
        height: 100%;
        padding: $space-2;
        border-radius: $radius-2;

        opacity: .1;
        background-color: inherit;
      }
    }

    @include is($variant-soft + $size-xs) {
      &::before {
        padding: 8px;
      }
    }

    @include is($variant-soft + $size-sm) {
      &::before {
        padding: 10px;
      }
    }

    @include is($variant-soft + $size-md) {
      &::before {
        padding: 12px;
      }
    }

    @include is($variant-soft + $size-lg) {
      &::before {
        padding: 14px;
      }
    }

    @include is($size-xs) {
      @include text(regular, 2xs);

      size: 8px;
      min-width: 8px;
      min-height: 8px;
      line-height: 8px;
    }

    @include is($size-sm) {
      @include text(regular, 2xs);

      min-width: 10px;
      min-height: 10px;
      line-height: 10px;
    }

    @include is($size-md) {
      @include text(regular, xs);

      min-width: 12px;
      min-height: 12px;
      line-height: 12px;
    }

    @include is($size-lg) {
      @include text(regular, sm);

      min-width: 14px;
      min-height: 14px;
      line-height: 14px;
    }

   @include is($primary-color) {
      color: $color-neutral-50;
      background-color: $color-primary;
    }

    @include is($neutral-color) {
      color: $color-neutral-50;
      background-color: $color-neutral;
    }

    @include is($gray-color) {
      color: $color-neutral-50;
      background-color: $color-gray;
    }

    @include is($red-color) {
      color: $color-neutral-50;
      background-color: $color-red;
    }

    @include is($yellow-color) {
      color: $color-neutral-950;
      background-color: $color-yellow;
    }

    @include is($green-color) {
      color: $color-neutral-950;
      background-color: $color-green;
    }

    @include is($blue-color) {
      color: $color-neutral-50;
      background-color: $color-blue;
    }

    @include is($purple-color) {
      color: $color-neutral-50;
      background-color: $color-purple;
    }

    @include is($position-top-right) {
      top: 0;
      right: 0;
      transform: translate(50%, -50%);
    }

    @include is($position-top-left) {
      top: 0;
      left: 0;
      transform: translate(-50%, -50%);
    }

    @include is($position-bottom-right) {
      right: 0;
      bottom: 0;
      transform: translate(50%, 50%);
    }

    @include is($position-bottom-left) {
      bottom: 0;
      left: 0;
      transform: translate(-50%, 50%);
    }

    @include is($standalone) {
      position: unset;
      z-index: unset;
      transform: unset;
    }

    @include is($inset) {
      transform: unset;
    }
  }

  &__slot {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    &:empty {
      display: none;
    }
  }
}
</style>
