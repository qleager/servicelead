<script lang="ts" setup>
import type { SelectInjection } from './Select.vue'

const { placeholder, isSelected, floatPlaceholder, size, counter } = inject('selectState') as SelectInjection

const classname = computed(() => [
  'select-placeholder',
  `select-placeholder-size-${size}`,
  {
    'select-placeholder-static': isSelected.value && counter == 'number',
    'select-placeholder-hidden': isSelected.value && counter !== 'number' && !floatPlaceholder,
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
  $size-md: $this + '-size-md';
  $float: $this + '-float';
  $static: $this + '-static';
  $hidden: $this + '-hidden';

  margin-inline: -#{$space-1};
  padding-inline: $space-1;
  font: inherit;
  color: $color-neutral-400;

  &#{$float} {
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

  &#{$static} {
    color: $color-neutral-900;
  }

  &#{$hidden} {
    display: none;
  }
}
</style>
