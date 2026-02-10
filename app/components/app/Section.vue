<script lang="ts" setup>
import type { VNodeChild } from 'vue'
import type { IconProps } from './Icon.vue'

interface Props {
  title?: string
  icon?: IconProps['name']
}
interface Slots {
  header?: VNodeChild
  content: VNodeChild
}

defineSlots<Slots>()

const props = defineProps<Props>()

const isHeaderGroupVisible = computed(() => props.icon || props.title)

export type { Props as SectionProps, Slots as SectionSlots }
</script>

<template>
  <div class="section">
    <div class="section__header">
      <div
        v-if="isHeaderGroupVisible"
        class="section__header-group"
      >
        <AppIcon
          v-if="icon"
          class="section__icon"
          :name="icon"
        />
        <div class="section__title">
          {{ title }}
        </div>
      </div>
      <slot name="header" />
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
  gap: $space-6;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    @include text(semibold, xl);

    &-group {
      display: flex;
      gap: $space-3;
      align-items: center;
    }
  }
}
</style>
