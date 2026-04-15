<script lang="ts" setup>
import type { VNodeChild } from 'vue'

interface Slots {
  content: () => VNodeChild
  header?: () => VNodeChild
  sidebar?: () => VNodeChild
}

const slots = defineSlots<Slots>()

const classname = computed(() => [
  'offer-single-pane-template',
  { 'offer-single-pane-template-sidebar': slots.sidebar },
])

export type { Slots as OfferSinglePaneTemplateSlots }
</script>

<template>
  <div
    :class="classname"
  >
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
  $this: &;
  $sidebar: $this + '-sidebar';

  display: flex;
  flex-direction: column;
  gap: $space-6;

  padding: $space-6;
  border-radius: $radius-10;

  background: white;

  &__header {
    width: 100%;
  }

  &__main {
    display: grid;
    grid-template-columns: 1fr;
    gap: $space-4;

    @include is($sidebar) {
      grid-template-columns: 1fr 290px;
    }
  }
}
</style>
