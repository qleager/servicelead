<script lang="ts" setup>
import type { SelectInjection } from './Select.vue'

const { size: selectSize } = inject('selectState') as SelectInjection

const size = computed(() => {
  switch (selectSize) {
    case 'lg':
      return 'md'
      break

    case 'md':
      return 'sm'

    case 'sm':
      return 'xs'

    default:
      return 'xs'
      break
  }
})
</script>

<template>
  <AppTag
    class="select-counter"
    color="neutral"
    :size
  >
    <slot />
  </AppTag>
</template>

<style>
.select-counter {
  mix-blend-mode: multiply;
}
</style>
