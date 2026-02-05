<script lang="ts" setup>
import type { SelectInjection } from './Select.vue'

const { size } = inject('selectState') as SelectInjection
</script>

<template>
  <AppTag
    :size
    color="neutral"
    class="select-counter"
  >
    <slot />
  </AppTag>
</template>
