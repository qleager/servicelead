<script lang="ts" setup>
import type { VNodeChild } from 'vue'
import type { IconProps } from '../app/Icon.vue'
import type { Size } from '~/types/ds'

interface Props {
  icon?: IconProps['name']
  size?: Size
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
  $size-xs: $this + '-size-xs';
  $size-sm: $this + '-size-sm';
  $size-md: $this + '-size-md';
  $size-lg: $this + '-size-lg';

  display: flex;
  gap: $space-2;
  align-items: center;

  &__icon {
    color: $color-neutral;

    @include is($size-xs) {
      width: 16px;
    }

    @include is($size-sm) {
      width: 20px;
    }

    @include is($size-md) {
      width: 24px;
    }

    @include is($size-lg) {
      width: 28px;
    }
  }

  &__title {
    @include is($size-xs) {
      @include text(semibold, md);
    }

    @include is($size-sm) {
      @include text(semibold, lg);
    }

    @include is($size-md) {
      @include text(semibold, xl);
    }

    @include is($size-lg) {
      @include text(semibold, 2xl);
    }
  }
}
</style>
