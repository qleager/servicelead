<script lang="ts" setup>
import type { VNodeChild } from 'vue'
import type { IconProps } from './Icon.vue'

interface Props {
  icon: IconProps['name']
  title: string
}

interface Slots {
  title?: () => VNodeChild
  subtitle?: () => VNodeChild
  content?: () => VNodeChild
  footer?: () => VNodeChild
}

defineProps<Props>()

defineSlots<Slots>()
</script>

<template>
  <AppCard class="widget">
    <template #title>
      <div class="widget__header">
        <div class="widget__header-group">
          <AppIcon
            class="widget__icon"
            :name="icon"
          />
          <div class="widget__title">
            {{ title }}
          </div>
        </div>
        <slot name="title" />
      </div>
    </template>
    <template #subtitle>
      <slot name="subtitle" />
    </template>
    <template #content>
      <slot name="content" />
    </template>
    <template #footer>
      <slot name="footer" />
    </template>
  </AppCard>
</template>

<style lang="scss">
.widget {
  $this: &;

  &__header {
    display: flex;
    gap: $space-3;
    align-items: center;
    justify-content: space-between;

    &-group {
      display: flex;
      gap: $space-3;
      align-items: center;
      margin-bottom: auto;
    }
  }

  &__icon {
    color: $color-neutral;
  }
}
</style>
