<script lang="ts" setup>
import type { VNodeChild } from 'vue'
import type { IconProps } from '../app/Icon.vue'
import type { Size } from '~/types/ds'

interface Props {
  icon?: IconProps['name']
  size?: Extract<Size, 'md'>
  title?: string
}

interface Slots {
  icon?: () => VNodeChild
  title?: () => VNodeChild
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
})

defineSlots<Slots>()

const classname = computed(() => ([
  'icon-title',
  `icon-title-size-${props.size}`,
]))
</script>

<template>
  <div :class="classname">
    <slot name="icon">
      <AppIcon
        v-if="icon"
        class="icon-title__icon"
        :name="icon"
      />
    </slot>
    <slot name="title">
      <div class="icon-title__title">
        {{ title }}
      </div>
    </slot>
  </div>
</template>

<style lang="scss">
.icon-title {
  $this: &;
  $size-md: $this + '-size-md';

  display: flex;
  gap: $space-2;
  align-items: center;

  &__icon {
    color: $color-neutral;
  }

  &__title {
    #{$size-md} & {
      @include text(semibold, xl);
    }
  }
}
</style>
