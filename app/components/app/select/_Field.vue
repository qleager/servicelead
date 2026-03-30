<script lang="ts" setup>
import type { SelectInjection } from './Select.vue'

const { size, color, variant, icon, isCollapsed, rounded } = inject('selectState') as SelectInjection

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
  $variant-solid: $this + '-variant-solid';
  $variant-outline: $this + '-variant-outline';
  $variant-nofilled: $this + '-variant-nofilled';
  $size-xs: $this + '-size-xs';
  $size-sm: $this + '-size-sm';
  $size-md: $this + '-size-md';
  $size-lg: $this + '-size-lg';
  $white-color: $this + '-color-white';
  $neutral-color: $this + '-color-neutral';
  $primary-color: $this + '-color-primary';
  $rounded: $this + '-rounded';
  $active: $this + '-active';

  cursor: pointer;

  position: relative;

  display: flex;
  align-items: center;

  width: 100%;
  border: 1px solid $color-neutral-300;
  border-radius: $radius-2;

  &:hover {
    border-color: $color-neutral-400;
    transition: $hover-duration-sm;
  }

  &:focus {
    border-color: $color-neutral-400;
    transition: $active-duration-sm;
  }

  &:focus-within {
    outline: 1px solid;
    outline-color: transparent;
    outline-offset: -1px;
    transition: $active-duration-sm;
  }

  &#{$rounded} {
    border-radius: 50px !important;
  }

  &#{$variant-solid} {
    --variant-solid-text-color: transparent;

    border: none !important;
    color: var(--variant-solid-text-color) !important;
    background-color: transparent;
    outline: none !important;
  }

  &#{$variant-outline} {
    --variant-outline-background-color: transparent;
    --variant-outline-text-color: unset;

    border: 1px solid;
    color: var(--variant-outline-text-color) !important;
    background-color: var(--variant-outline-background-color) !important;
  }

  &#{$variant-nofilled} {
    --variant-nofilled-background-color: transparent;

    border: transparent;
    background-color: var(--variant-nofilled-background-color) !important;
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

  &#{$white-color} {
    --variant-solid-text-color: $color-neutral-950;
    --variant-outline-text-color: white;

    border-color: white;
    color: white;
    background-color: white;

    &:hover {
      --variant-outline-background-color: white;
      --variant-nofilled-background-color: white;
      --variant-outline-text-color: #{$color-neutral-950};

      border-color: #{$color-neutral-50};
      color:  #{$color-neutral-950};
      background-color: #{$color-neutral-150};
    }

    &:active {
      --variant-nofilled-background-color: #{$color-neutral-100};
      --variant-outline-background-color: #{$color-neutral-100};

      border-color: #{$color-neutral-150};
      color: #{$color-neutral-950};
      background-color: #{$color-neutral-150};
    }
  }

  &#{$neutral-color} {
    --variant-solid-text-color: $color-neutral-950;
    --variant-outline-text-color: #{$color-neutral-950};

    transform: $blur-duration-sm;
    border-color: $color-neutral-300;
    color: $color-neutral-300;
    background-color: $color-neutral-100;

    &:hover {
      --variant-nofilled-background-color: #{$color-neutral-100};
      --variant-outline-background-color: #{$color-neutral-100};

      transform: $hover-duration-sm;
      border-color: $color-neutral-400;
      background-color: $color-neutral-150;
    }

    &:focus-within {
      --variant-nofilled-background-color: #{$color-neutral-100};
      --variant-outline-background-color: #{$color-neutral-100};

      transform: $active-duration-sm;
      background-color: $color-neutral-150;
    }
  }

  &#{$primary-color} {
    --variant-solid-text-color: white;
    --variant-nofilled-background-color: transparent;
    --variant-outline-text-color: #{$color-primary};

    border-color: $color-primary;
    color: $color-primary;
    background-color: $color-primary;

    &:hover {
      --variant-nofilled-background-color: #{$color-primary-100};
      --variant-outline-background-color: #{$color-primary-100};

      border-color: $color-primary-600;
      background-color: $color-primary-600;
    }

    &:active {
      border-color: #{$color-primary-700};
      background-color: #{$color-primary-700};
    }

    &:disabled {
      --variant-solid-text-color: #{$color-neutral-400};

      border-color: #{$color-neutral-100};
      background-color: #{$color-neutral-100};
    }
  }

  &#{$rounded} {
    border-radius: 50px;
  }

  &__icon {
    flex-shrink: 0;
    color: inherit;

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
  }

  &__value {
    overflow: hidden;
    display: flex;
    flex: 1;
    gap: $space-2;
    align-items: center;

    text-overflow: ellipsis;

    #{$size-xs} & {
      $space: $space-05;

      margin-inline: -#{$space};
      padding-inline: $space;
    }

    #{$size-sm} & {
      $space: $space-1;

      margin-inline: -#{$space};
      padding-inline: $space;
    }

    #{$size-md} & {
      $space: $space-2;

      margin-inline: -#{$space};
      padding-inline: $space;
    }

    #{$size-lg} & {
      $space: $space-3;

      margin-inline: -#{$space};
      padding-inline: $space;
    }
  }

  &__indicator {
    color: inherit;
    transition: $blur-duration-sm;

    #{$active} & {
      transform: scale(1, -1);
      transition: $active-duration-sm;
    }

    #{$neutral-color} & {
      color: $color-neutral-400;
    }

    #{$size-xs} & {
      margin-inline: -#{$space-05};
    }

    #{$size-sm} & {
      margin-inline: -#{$space-1};
    }

    #{$size-md} & {
      margin-inline: -#{$space-2};
    }

    #{$size-lg} & {
      margin-inline: -#{$space-3};
    }
  }
}
</style>
