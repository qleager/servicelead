<script lang="ts" setup>
import type { SelectValue, SelectInjection } from './Select.vue'

const { size } = inject('selectState') as SelectInjection

interface Props {
  checkbox?: boolean
  isSelected?: boolean
  label: string
  value: SelectValue
}

const props = defineProps<Props>()

const classname = computed(() => [
  'select-option',
  `select-option-size-${size}`,
])

const isIndicatorVisible = computed(() => props.isSelected && !props.checkbox)

export type { Props as SelectOptionProps }
</script>

<template>
  <button
    aria-selected
    :class="classname"
  >
    <AppCheckbox
      v-if="checkbox"
      class="select-option__checkbox"
      :model-value="isSelected"
      :size
    />
    <div class="select-option__label">
      {{ label }}
    </div>
    <AppIcon
      v-if="isIndicatorVisible"
      class="select-option__indicator"
      name="check_24"
    />
  </button>
</template>

<style lang="scss">
.select-option {
  $this: &;
  $size-xs: $this + '-size-xs' ;
  $size-sm: $this + '-size-sm';
  $size-md: $this + '-size-md';
  $size-lg: $this + '-size-lg';

  cursor: pointer;

  display: flex;
  gap: $space-4;
  align-items: center;

  width: 100%;
  padding: $space-2;
  border-radius: $radius-2;

  font: inherit;

  transition: $blur-duration-sm;

  @include is($size-xs) {
    gap: $space-2;
    height: 32px;

    @include text(regular, xs);
  }

  @include is($size-sm) {
    gap: $space-3;
    height: 36px;

    @include text(regular, sm);
  }

   @include is($size-md) {
    gap: $space-4;
    height: 40px;

    @include text(regular, md);
  }

  @include is($size-lg) {
    gap: $space-5;
    height: 44px;

    @include text(regular, lg);
  }

  &:hover {
    background-color: $color-neutral-50;
    transition: $hover-duration-sm;
  }

  &:focus {
    background-color: $color-neutral-50;
    transition: $hover-duration-sm;
  }

  &__checkbox {
    pointer-events: none;
  }

  &__indicator {
    margin-left: auto;

    @include is($size-xs) {
      $size: 16px;

      width: $size;
      height: $size;
    }

    @include is($size-sm) {
      $size: 20px;

      width: $size;
      height: $size;
    }

    @include is($size-md) {
      $size: 24px;

      width: $size;
      height: $size;
    }

    @include is($size-lg) {
      $size: 28px;

      width: $size;
      height: $size;
    }
  }
}
</style>
