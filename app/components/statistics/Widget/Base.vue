<script lang="ts" setup>
import type { VNodeChild } from 'vue'
import type { IconProps } from '~/components/app/Icon.vue'

interface Props {
  icon?: IconProps['name']
  title?: string
}

interface Slots {
  chart?: () => VNodeChild
  value?: () => VNodeChild
}

defineProps<Props>()

defineSlots<Slots>()
</script>

<template>
  <AppWidget
    class="statistics-widget"
    color="neutral"
    :icon
    :title
  >
    <template #content>
      <div class="statistics-widget__content">
        <slot name="value" />
        <slot name="chart" />
      </div>
    </template>
  </AppWidget>
</template>

<style lang="scss">
.statistics-widget {
  $this: &;

  &__content {
    display: grid;
    grid-template-columns: repeat(2, auto);
    gap: $space-6;
    align-items: flex-end;
    justify-content: space-between;
  }
}
</style>
