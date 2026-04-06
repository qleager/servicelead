<script lang="ts" setup>
import type { IconName } from '@app/types/components/app/icon'

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
    :height="size"
    :width="size"
  >
    <use :xlink:href="`/_nuxt/sprite#${name}`" />
  </svg>
</template>

<style lang="scss">
.icon {
  fill: currentcolor;
}
</style>
