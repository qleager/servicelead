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
  <div class="card-dropdown">
    <AppFloater
      placement="bottom"
    >
      <template #default="defaultProps">
        <slot :is-open="defaultProps.isOpen" />
      </template>

      <template #content>
        <AppCard
          :icon="$props.icon"
          :title="$props.title"
          :centered="$props.centered"
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
  </div>
</template>
