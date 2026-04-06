<script lang="ts" setup>
import type { Subset, Size } from '~/types/ds'
import type { IconProps } from './Icon.vue'
import type { VNodeChild } from 'vue'

interface Props {
  active: boolean
  disabled?: boolean
  icon?: IconProps['name']
  label: string
  size?: Subset<Size, 'xs' | 'sm' | 'md'>
  trailingIcon?: boolean
  value: string | number
  variant?: 'pill' | 'link'
}

interface Slots {
  /**
   * As Item content
   */
  default: () => VNodeChild
  /**
   * Before Item content
   */
  leading: () => VNodeChild
  /**
   * After Item content
   */
  trailing: () => VNodeChild
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  variant: 'pill',
})

defineSlots<Slots>()

const classname = computed(() => [
  'tabs-item',
  `tabs-item-variant-${props.variant}`,
  `tabs-item-size-${props.size}`,
  {
    'tabs-item-trailing-icon': props.trailingIcon,
    'tabs-item-active': props.active,
  },
])

export type { Props as TabsItemProps, Slots as TabsItemSlot }
</script>

<template>
  <button
    :class="classname"
    :disabled
    :value
  >
    <span class="tabs-item__content">
      <slot
        name="leading"
      />

      <div class="tabs-item__content-group">
        <AppIcon
          v-if="icon"
          class="tabs-item__icon"
          :name="icon"
        />
        <slot
          name="default"
        >
          {{ label }}
        </slot>
      </div>

      <slot
        name="trailing"
      />
    </span>
  </button>
</template>

<style lang="scss">
.tabs-item {
  $this: &;
  $variant-link: $this + '-variant-link';
  $variant-pill: $this + '-variant-pill';
  $size-xs: $this + '-size-xs';
  $size-sm: $this + '-size-sm';
  $size-md: $this + '-size-md';
  $trailing-icon: $this + '-trailing-icon';

  cursor: pointer;
  position: relative;
  flex-shrink: 0;

  @include is($size-xs) {
    gap: $space-1;

    @include text(regular, xs);
  }

  @include is($size-sm) {
    gap: $space-2;

    @include text(regular, sm);
  }

  @include is($size-md) {
    gap: $space-3;

    @include text(regular, md);
  }

  @include is($variant-pill) {
    display: flex;
    align-items: center;

    border: 1px solid transparent;
    border-radius: 50px;

    background-color: transparent;

    transition: $blur-duration-sm;

    &:hover {
      border-color: $color-neutral-50 !important;
      transition: $hover-duration-sm;
    }

    &:disabled {
      cursor: not-allowed;
      color: $color-neutral-200 !important;
    }

    &::before {
      pointer-events: none;
      content: '';

      position: absolute;
      z-index: 1;
      inset: 0;

      border: 1px solid $color-neutral-300;
      border-radius: inherit;

      transition: $blur-duration-sm;
    }

    &:disabled::before {
      border-color: $color-neutral-200 !important;
    }

    &:hover::before {
      border: 1px solid $color-neutral-200;
      transition: $hover-duration-sm;
    }
  }

  @include is($variant-link) {
    padding-bottom: $space-2;
    color: $color-neutral;
    transition: $blur-duration-sm;

    &:hover {
      color: inherit;
      transition: $hover-duration-sm;
    }

    &:disabled {
      color: $color-neutral-200;
    }
  }

  @include is($size-xs + $variant-link) {
    height: 24px;
    padding-bottom: $space-05;
  }

  @include is($size-sm + $variant-link) {
    height: 28px;
    padding-bottom: $space-1;
  }

  @include is($size-md + $variant-link) {
    height: 32px;
    padding-bottom: $space-2;
  }

  @include is($size-xs + $variant-pill) {
    height: 32px;
    padding-inline: $space-3;
  }

  @include is($size-sm + $variant-pill) {
    height: 40px;
    padding-inline: $space-4;
  }

  @include is($size-md + $variant-pill) {
    height: 48px;
    padding-inline: $space-5;
  }

  &-active {
    @include is($variant-link) {
      color: inherit;
    }
  }

  &__content {
    pointer-events: none;

    position: relative;
    z-index: 3;

    display: inline-flex;
    gap: inherit;
    align-items: center;

    &-group {
      display: flex;
      gap: $space-2;

      @include is($trailing-icon) {
        flex-direction: row-reverse;
      }
    }
  }

  &__icon {
    @include is($size-xs) {
      width: 16px;
      height: 16px;
      margin-inline: -$space-05 0;
    }

    @include is($size-xs + $trailing-icon) {
      margin-inline: 0 (-$space-05);
    }

    @include is($size-sm) {
      width: 20px;
      height: 20px;
      margin-left: -$space-1;
    }

    @include is($size-sm + $trailing-icon) {
      margin-inline: 0 (-$space-2);
    }

    @include is($size-md) {
      width: 24px;
      height: 24px;
      margin-inline: -$space-2 0;
    }

    @include is($size-md + $trailing-icon) {
      margin-inline: 0 (-$space-2);
    }

    @include is($variant-link) {
      margin: unset;
    }
  }
}
</style>
