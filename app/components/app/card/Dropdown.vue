<script lang="ts" setup>
import type { VNodeChild } from 'vue'
import type { CardProps } from './Card.vue'
import type { FloaterModel } from '../Floater.vue'

type Props = CardProps

interface Slots {
  default?: (props: { isOpen: FloaterModel }) => VNodeChild
  header?: () => VNodeChild
  content: () => VNodeChild
  footer?: () => VNodeChild
}

defineProps<Props>()

defineSlots<Slots>()
</script>

<template>
  <AppFloater
    placement="bottom"
    class="card-dropdown"
  >
    <template #default="{ isOpen }">
      <slot :is-open />
    </template>

    <template #content>
      <AppCard
        :icon
        :title
        :centered
        class="card-dropdown__drop"
      >
        <template
          v-if="$slots.header"
          #header
        >
          <slot name="header" />
        </template>

        <slot name="content" />

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
