<script lang="ts" setup>
import type { SelectInjection } from './Select.vue'

const { size, isCollapsed, rounded } = inject('selectState') as SelectInjection

const classname = computed(() => [
  'select-field',
  `select-field-size-${size}`,
  { 'select-field-active': isCollapsed.value },
  { 'select-field-rounded': rounded },
])
</script>

<template>
  <button
    :class="classname"
    type="button"
  >
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
  $size-xs: $this + '-size-xs';
  $size-md: $this + '-size-md';
  $rounded: $this + '-rounded';
  $active: $this + '-active';

  cursor: pointer;

  position: relative;

  display: flex;
  align-items: center;

  width: 310px;
  border: 1px solid $color-neutral-light-300;

  @include text(regular, sm);

  transition: $blur-duration-sm;

  &:hover {
    border-color: $color-neutral-light-400;
    transition: $hover-duration-sm;
  }

  &:focus {
    border-color: $color-neutral-light-400;
    transition: $active-duration-sm;
  }

  &#{$size-xs} {
    height: 24px;
    border-radius: $radius-1;
  }

  &#{$size-md} {
    height: 48px;
    border-radius: $radius-2;
  }

  &#{$rounded} {
    border-radius: 50px;
  }

  &__value {
    display: flex;
    gap: $space-2;
    align-items: center;

    max-width: 100%;

    text-overflow: ellipsis;

    #{$size-xs} & {
      padding-inline: $space-3 $space-4;
    }

    #{$size-md} & {
      padding-inline: $space-4 $space-10;
    }
  }

  &__indicator {
    position: absolute;
    color: $color-neutral-light-500;
    transition: $blur-duration-sm;

    #{$active} & {
      transform: scale(1, -1);
      transition: $active-duration-sm;
    }

    #{$size-xs} & {
      right: $space-1;
      width: 16px;
      height: 16px;
    }

    #{$size-md} & {
      right: $space-2;
    }
  }
}
</style>
