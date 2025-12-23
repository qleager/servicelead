<script lang="ts" setup>
import type { SelectInjection } from './Select.vue'

const { placeholder, placeholderMode, isSelected, size } = inject('selectState') as SelectInjection

const classname = computed(() => [
  'select-placeholder',
  `select-placeholder-size-${size}`,
  {
    'select-placeholder-float': isSelected.value && placeholderMode === 'float',
    'select-placeholder-static': isSelected.value && placeholderMode === 'static',
    'select-placeholder-hidden': isSelected.value && !placeholderMode,
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
  color: $color-neutral-light-400;

  &#{$size-xs} {
    @include text(regular, xs);
  }

  &#{$float} {
    position: absolute;
    top: 0;
    transform: translateY(-50%);

    color: $color-neutral-light-900;

    backdrop-filter: blur(20px);
  }

  &#{$static} {
    color: $color-neutral-light-900;
  }

  &#{$hidden} {
    display: none;
  }
}
</style>
