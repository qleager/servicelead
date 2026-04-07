<script lang="ts" setup>
import type { SelectInjection } from './Select.vue'

const { size } = inject('selectState') as SelectInjection

const inputSize = computed(() => {
  switch (size) {
    case 'xs':
      return 'xs'
      break
    case 'sm':
      return 'xs'
      break
    case 'md':
      return 'sm'
      break
    default:
      return 'md'
      break
  }
})
</script>

<template>
  <AppInput
    class="select-search"
    color="neutral"
    icon="search"
    reset
    rounded
    :size="inputSize"
    trailing-icon
    variant="solid"
  />
</template>

<style lang="scss">
.select-search {
  width: 100%;
  margin-bottom: $space-2;
}
</style>
