<script lang="ts" setup>
import type { IconProps } from './Icon.vue'

interface Props {
  icon?: IconProps['name']
  title?: string
  centered?: boolean
}

interface Slots {
  header?: () => void
  default: () => void
  footer?: () => void
}

const props = defineProps<Props>()

const slots = defineSlots<Slots>()

const classname = computed(() => [
  'card',
  {
    'card-centered': props.centered,
  },
])
const isTitleVisible = computed(() => props.title && !slots.header)
const isHeaderVisible = computed(() => props.title || props.icon || slots.header)
</script>

<template>
  <div :class="classname">
    <header
      v-if="isHeaderVisible"
      class="card__header"
    >
      <AppIcon
        v-if="icon"
        :name="icon"
        class="card__icon"
      />
      <div
        v-if="isTitleVisible"
        class="card__title"
      >
        {{ title }}
      </div>
      <slot name="header" />
    </header>

    <div class="card__main">
      <slot />
    </div>

    <footer
      v-if="$slots.footer"
      class="card__footer"
    >
      <slot name="footer" />
    </footer>
  </div>
</template>

<style lang="scss">
.card {
  $this: &;
  $centered: $this + '-centered';

  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: $space-4;

  border-radius: $space-8;

  background-color: #fff;

  &__header {
    display: flex;
    gap: $space-3;
    align-items: center;
    padding: $space-4 $space-4 0 $space-4;

    #{$centered} & {
      justify-content: center;
    }
  }

  &__icon {
    color: $color-neutral;
  }

  &__title {
    @include text(semibold, xl);

    line-height: 1;
  }

  &__main {
    display: flex;
    padding: 0 $space-4;

    #{$centered} & {
      justify-content: center;
    }

    &:empty {
      display: none;
    }

    &:first-child {
      padding-top: $space-4;
    }

    &:last-child {
      padding-bottom: $space-4;
    }
  }

  &__footer {
    display: flex;
    padding: 0 $space-4 $space-4;

    #{$centered} & {
      justify-content: center;
    }
  }
}
</style>
