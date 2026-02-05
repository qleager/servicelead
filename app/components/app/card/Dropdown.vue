<script lang="ts" setup>
import type { IconProps } from '../Icon.vue'

interface Props {
  icon?: IconProps['name']
  title?: string
  centered?: boolean
}

interface Slots {
  header?: () => void
  default?: () => void
  content: () => void
  footer?: () => void
}

const props = defineProps<Props>()

const slots = defineSlots<Slots>()

const classname = computed(() => [
  'card-dropdown',
  {
    'card-dropdown-centered': props.centered,
  },
])
const isHeaderVisible = computed(() => props.title || props.icon || slots.header)
</script>

<template>
  <div :class="classname">
    <AppFloater
      placement="bottom"
    >
      <slot />

      <template #content>
        <div class="card-dropdown">
          <header
            v-if="isHeaderVisible"
            class="card-dropdown__header"
          >
            <AppIcon
              v-if="icon"
              :name="icon"
              class="card-dropdown__icon"
            />
            <div
              v-if="title"
              class="card-dropdown__title"
            >
              {{ title }}
            </div>
            <slot name="header" />
          </header>

          <div class="card-dropdown__main">
            <slot name="content" />
          </div>

          <footer
            v-if="$slots.footer"
            class="card-dropdown__footer"
          >
            <slot name="footer" />
          </footer>
        </div>
      </template>
    </AppFloater>
  </div>
</template>

<style lang="scss">
.card-dropdown {
  $this: &;
  $centered: $this + '-centered';

  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: $space-4;

  border-radius: $space-8;

  background-color: #fff;
  box-shadow: $shadow-md;

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

    &:empty {
      display: none;
    }

    &:first-child {
      padding-top: $space-4;
    }

    &:last-child {
      padding-bottom: $space-4;
    }

    #{$centered} & {
      justify-content: center;
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
