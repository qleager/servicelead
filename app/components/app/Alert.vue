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

const iconByType: Record<NonNullable<Props['type']>, Icons> = {
  info: 'info',
}

const iconName = computed(() => iconByType[props.type])

const classname = computed(() => [
  'alert',
  `alert-type-${props.type}`,
])

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

  line-height: 1.357em;

  @include is($type-info) {
    color: $color-neutral-950;
    background-color: $color-blue-50;
  }

  &__icon {
    margin-top: $space-05;
  }
}
</style>
