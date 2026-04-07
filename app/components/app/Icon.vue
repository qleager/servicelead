<script lang="ts" setup>
import type { Icons } from '~/types/components/icon'

interface Props {
  name: Icons
  size?: number
}

const props = withDefaults(defineProps<Props>(), {
  size: 24,
})

const Icon = computed(() => {
  return props.name
    ? defineAsyncComponent(() => import(`assets/icons/${props.name}.svg?use`))
    : null
})

export type { Props as IconProps }
</script>

<template>
  <component
    :is="Icon"
    v-if="name"
    class="icon"
    :height="size"
    :width="size"
  />
</template>

<style lang="scss">
.icon {
  fill: currentcolor;
}
</style>
