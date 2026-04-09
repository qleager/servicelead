<script lang="ts" setup>
import type { VNodeChild } from 'vue'

interface Slots {
  main: () => VNodeChild
  sidebar?: () => VNodeChild
}

defineSlots<Slots>()

export type { Slots as OfferTabPaneSlots }
</script>

<template>
  <div class="offer-single-tab-pane">
    <div class="offer-single-tab-pane__main">
      <slot name="main" />
    </div>
    <div
      v-if="$slots.sidebar"
      class="offer-single-tab-pane__sidebar"
    >
      <slot name="sidebar" />
    </div>
  </div>
</template>

<style lang="scss">
.offer-single-tab-pane {
    display: grid;
    grid-template-columns: 1fr 290px;
    gap: $space-4;
}
</style>
