<script lang="ts" setup>
import type { VNodeChild } from 'vue'

interface Slots {
  content: () => VNodeChild
  header: () => VNodeChild
  sidebar: () => VNodeChild
}

export type { Slots as OfferSinglePaneTemplateSlots }
</script>

<template>
  <div
    class="offer-single-pane-template"
  >
    <div
      v-if="$slots.header"
      class="offer-single-pane-template__header"
    >
      <slot name="header" />
    </div>
    <div class="offer-single-pane-template__main">
      <slot name="content" />
    </div>
    <div
      v-if="$slots.sidebar"
      class="offer-single-pane-template__sidebar"
    >
      <slot name="sidebar" />
    </div>
  </div>
</template>

<style lang="scss">
.offer-single-pane-template {
  $this: &;
  $grid-sidebar: $this + '-grid-sidebar';

  display: flex;
  flex-flow: row wrap;
  gap: $space-6 $space-4;

  padding: $space-6;
  border-radius: $radius-10;

  background: white;

  &__header {
    width: 100%;
  }

  &__main {
    grid-area: main;
    flex: 1;
    width: 100%;
  }

  &__sidebar {
    grid-area: sidebar;
    max-width: 290px;
  }
}
</style>
