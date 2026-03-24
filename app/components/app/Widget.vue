<script lang="ts" setup>
import type { VNodeChild } from 'vue'
import type { IconProps } from './Icon.vue'
import type { Color, Subset } from '~/types/ds'

interface Props {
  color?: Subset<Color, 'neutral'> | 'white'
  description?: string
  icon?: IconProps['name']
  title?: string
}

interface Slots {
  content: () => VNodeChild
  description?: () => VNodeChild
  footer?: () => VNodeChild
  trailingHeader?: () => VNodeChild
}

defineProps<Props>()

defineSlots<Slots>()

export type { Props as WidgetProps, Slots as WidgetSlots }
</script>

<template>
  <AppCard
    class="widget"
    :color
  >
    <template
      v-if="title"
      #title
    >
      <div class="widget__header">
        <AppTitle
          :icon
          :title
        />

        <slot name="trailingHeader" />
      </div>
    </template>

    <template
      v-if="$slots.description || description"
      #description
    >
      <slot name="description">
        {{ description }}
      </slot>
    </template>

    <template #content>
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

<style lang="scss">
.widget {
  $this: &;

  &__header {
    display: flex;
    gap: $space-4;
    justify-content: space-between;
  }
}
</style>
