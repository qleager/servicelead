<script lang="ts" setup>
import type { SelectInjection } from './Select.vue'

const { size, color, icon, isCollapsed, rounded, variant } = inject('selectState') as SelectInjection

const classname = computed(() => [
  'select-field',
  `select-field-size-${size}`,
  `select-field-color-${color}`,
  `select-field-variant-${variant}`,
  { 'select-field-active': isCollapsed.value },
  { 'select-field-rounded': rounded },
])
</script>

<template>
  <button
    :class="classname"
    type="button"
  >
    <AppIcon
      v-if="icon"
      class="select-field__icon"
      :name="icon"
    />
    <div
      class="select-field__value"
    >
      <slot />
    </div>
    <AppIcon
      class="select-field__indicator"
      name="dropdown"
    />
  </button>
</template>

<style lang="scss">
.select-field {
  $this: &;
  $size-2xs: $this + '-size-2xs';
  $size-xs: $this + '-size-xs';
  $size-sm: $this + '-size-sm';
  $size-md: $this + '-size-md';
  $size-lg: $this + '-size-lg';
  $white-color: $this + '-color-white';
  $neutral-color: $this + '-color-neutral';
  $primary-color: $this + '-color-primary';
  $variant-outline: $this + '-variant-outline';
  $variant-ghost: $this + '-variant-ghost';
  $rounded: $this + '-rounded';
  $active: $this + '-active';

  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;

  @include is($variant-outline) {
    border: 1px solid;
    border-radius: $radius-2;
  }

  @include is($variant-ghost) {
    border-radius: $radius-2;
  }

  @include is($size-2xs) {
    gap: $space-2;
    height: 24px;
    padding-inline: $space-2;
    border-radius: $radius-2;

    @include text(regular, sm);
  }

  @include is($size-xs) {
    gap: $space-1;
    height: 32px;
    padding-inline: $space-3;
    border-radius: $radius-2;

    @include text(regular, sm);
  }

  @include is($size-sm) {
    gap: $space-3;
    height: 40px;
    padding-inline: $space-4;
    border-radius: $radius-2;

    @include text(regular, sm);
  }

  @include is($size-md) {
    gap: $space-4;
    height: 48px;
    padding-inline: $space-5;
    border-radius: $radius-2;

    @include text(regular, md);
  }

  @include is($white-color) {
    border-color: white;

    &:hover {
      border-color: $color-neutral-50;
      background-color: $color-neutral-100;
    }
  }

  @include is($white-color + $active) {
    border-color: $color-neutral-50;
    background-color: $color-neutral-100;
  }

  @include is($neutral-color) {
    border-color: $color-neutral-300;

    &:hover {
      border-color: $color-neutral-400;
      background-color: $color-neutral-50;
    }
  }

  @include is($neutral-color + $active) {
    border-color: $color-neutral-400;
    background-color: $color-neutral-100;
  }

  @include is($primary-color) {
    border-color: $color-primary;

    &:hover {
      border-color: $color-primary-600;
      background-color: $color-neutral-50;
    }
  }

  @include is($primary-color + $active) {
    border-color: $color-primary-600;
    background-color: $color-neutral-100;
  }

  @include is($rounded) {
    border-radius: 50px;
  }

  &__icon {
    flex-shrink: 0;
    color: inherit;

    @include is($size-2xs) {
      width: 16px;
      height: 16px;
      margin-inline: -#{$space-05};
    }

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
  }

  &__value {
    overflow: hidden;
    display: flex;
    flex: 1;
    gap: $space-2;
    align-items: center;

    text-overflow: ellipsis;

    @include is($size-2xs) {
      $space: $space-05;
    }

    @include is($size-xs) {
      $space: $space-05;
    }

    @include is($size-sm) {
      $space: $space-1;
    }

    @include is($size-md) {
      $space: $space-2;
    }
  }

  &__indicator {
    color: inherit;
    transition: $blur-duration-sm;

    @include is($active) {
      transform: scale(1, -1);
      transition: $active-duration-sm;
    }

    @include is($white-color) {
      color: $color-neutral-50;
    }

    @include is($neutral-color) {
      color: $color-neutral-400;
    }

    @include is($primary-color) {
      color: $color-primary;
    }

    @include is($size-2xs) {
      width: 16px;
      height: 16px;
    }

    @include is($size-xs) {
      width: 16px;
      height: 16px;
    }

    @include is($size-sm) {
      width: 20px;
      height: 20px;
    }

    @include is($size-md) {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
