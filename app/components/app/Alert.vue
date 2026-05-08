<script lang="ts" setup>
import type { VNodeChild } from 'vue'
import type { Icons } from '~/types/components/icon'

interface Props {
  type?: 'info'
}

interface Slots {
  default: () => VNodeChild
}

const props = withDefaults(defineProps<Props>(), {
  type: 'info',
})

defineSlots<Slots>()

const classname = computed(() => [
  'alert',
  `alert-type-${props.type}`,
])

const iconName = computed<Icons>(() => {
  switch (props.type) {
    case 'info':
    default:
      return 'info'
  }
})

export type { Props as AlertProps }
</script>

<template>
  <div :class="classname">
    <AppIcon
      class="alert__icon"
      :name="iconName"
      :size="16"
    />
    <slot />
  </div>
</template>

<style lang="scss">
.alert {
  $this: &;
  $type-info: $this + '-type-info';

  display: flex;
  gap: $space-2;
  align-items: flex-start;

  padding: $space-2 $space-4;
  border-radius: $space-6;

  @include text(regular, sm);

  @include is($type-info) {
    color: $color-neutral-950;
    background-color: $color-blue-50;
  }

  &__icon {
    margin-top: $space-05;
  }
}
</style>
