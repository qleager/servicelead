<script lang="ts" setup>
import type { SelectInjection } from './Select.vue'

const { placeholder, isSelected, floatPlaceholder, size } = inject('selectState') as SelectInjection

const classname = computed(() => [
  'select-placeholder',
  `select-placeholder-size-${size}`,
  {
    'select-placeholder-hidden': isSelected.value && !floatPlaceholder,
    'select-placeholder-float': isSelected.value && floatPlaceholder,
  },
])
</script>

<template>
  <div :class="classname">
    {{ placeholder }}
  </div>
</template>

<style lang="scss">
.select-placeholder {
  $this: &;
  $size-xs: $this + '-size-xs';
  $size-sm: $this + '-size-sm';
  $size-md: $this + '-size-md';
  $size-lg: $this + '-size-lg';
  $float: $this + '-float';
  $hidden: $this + '-hidden';

  font: inherit;
  color: $color-neutral-400;

  @include is($size-xs) {
    @include text(regular, xs);
  }

  @include is($size-sm) {
    @include text(regular, sm);
  }

  @include is($size-md) {
    @include text(regular, md);
  }

  @include is($size-lg) {
    @include text(regular, md);
  }

  @include is($float) {
    position: absolute;
    top: 0;
    transform: translateY(-50%);
    color: $color-neutral-900;

    @include text(regular, xs);

    &::after {
      content: '';

      position: absolute;
      z-index: -1;
      top: calc(50% - 1px);
      left: 0;

      width: 100%;
      height: 1px;

      background-color: white;
    }
  }

  @include is($hidden) {
    display: none;
  }
}
</style>
