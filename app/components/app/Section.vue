<script lang="ts" setup>
import type { VNodeChild } from 'vue'
import type { IconProps } from './Icon.vue'

interface Props {
  icon?: IconProps['name']
  title?: string
}
interface Slots {
  content: VNodeChild
  trailingHeader?: VNodeChild
}

defineProps<Props>()

export type { Props as SectionProps, Slots as SectionSlots }
</script>

<template>
  <div class="section">
    <div class="section__header">
      <AppTitle
        :icon
        size="lg"
        :title
      />
      <slot name="trailingHeader" />
    </div>
    <div class="section__main">
      <slot name="content" />
    </div>
  </div>
</template>

<style lang="scss">
.section {
  display: flex;
  flex-direction: column;
  gap: $space-4;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    @include text(semibold, 2xl);

    &-group {
      display: flex;
      gap: $space-3;
      align-items: center;
    }
  }
}
</style>
