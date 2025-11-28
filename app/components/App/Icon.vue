<script lang="ts" setup>
import type { IconName } from '~/types/IconName'

interface Props {
  name: IconName
  size?: number
}

withDefaults(defineProps<Props>(), {
  size: 24,
})

export type { Props as IconProps }
</script>

<template>
  <svg
    class="icon"
    :width="size"
    :height="size"
  >
    <use :xlink:href="`/sprite#${name || 'favorite'}`" />
  </svg>
</template>

<style lang="scss">
.icon {
  fill: currentcolor;

  // outline: 1px dashed rgb($color-warning, 80%);
  // outline-offset: -2px;
}
</style>
