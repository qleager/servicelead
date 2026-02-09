<script lang="ts" setup>
import type { VNodeChild } from 'vue'
import type { FloaterModel } from '../Floater.vue'
import type { CardSlots } from './Card.vue'

interface Slots extends CardSlots {
  default?: (props: { isOpen: FloaterModel }) => VNodeChild
}

defineSlots<Slots>()
</script>

<template>
  <AppFloater
    class="card-dropdown"
    placement="bottom"
  >
    <template #default="{ isOpen }">
      <slot :is-open />
    </template>

    <template #content>
      <AppCard
        class="card-dropdown__drop"
      >
        <template
          v-if="$slots.header"
          #header
        >
          <slot name="header" />
        </template>

        <template
          v-if="$slots.title"
          #title
        >
          <slot name="title" />
        </template>

        <template
          v-if="$slots.subtitle"
          #subtitle
        >
          <slot name="subtitle" />
        </template>

        <template
          v-if="$slots.content"
          #content
        >
          <slot name="content" />
        </template>

        <template
          v-if="$slots.footer"
          #footer
        >
          <slot name="footer" />
        </template>
      </AppCard>
    </template>
  </AppFloater>
</template>

<style lang="scss">
.card-dropdown {
  $this: &;

  &__drop {
    box-shadow: $shadow-md;
  }
}
</style>
