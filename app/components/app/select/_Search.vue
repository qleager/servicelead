<script lang="ts" setup>
import type { SelectInjection } from './Select.vue'

const { size } = inject('selectState') as SelectInjection
</script>

<template>
  <AppInput
    class="select-search"
    color="neutral"
    icon="search"
    reset
    rounded
    :size
    trailing-icon
    variant="filled"
  />
</template>

<style lang="scss">
.select-search {
  width: 100%;
  margin-bottom: $space-2;
}
</style>
