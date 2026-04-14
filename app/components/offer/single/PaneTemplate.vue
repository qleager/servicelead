<script lang="ts" setup>
import type { VNodeChild } from 'vue'

interface Slots {
  content: () => VNodeChild
  header?: () => VNodeChild
  sidebar?: () => VNodeChild
}

defineSlots<Slots>()

export type { Slots as OfferSinglePaneTemplateSlots }
</script>

<template>
  <div class="offer-single-pane-template">
    <div
      v-if="$slots.header"
      class="offer-single-pane-template__header"
    >
      <slot name="header" />
    </div>
    <div class="offer-single-pane-template__main">
      <div class="offer-single-pane-template__content">
        <slot name="content" />
      </div>
      <div
        v-if="$slots.sidebar"
        class="offer-single-pane-template__sidebar"
      >
        <slot name="sidebar" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.offer-single-pane-template {
  width: 100%;

  &__header {
    display: flex;
    gap: $space-6;
    align-items: center;
    justify-content: space-between;
  }

  &__main {
    display: grid;
    grid-template-columns: 1fr 290px;
    gap: $space-4;
  }
}
</style>
