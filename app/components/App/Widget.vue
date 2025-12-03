<script lang="ts" setup>
import type { IconProps } from '@/components/App/Icon.vue'

interface Props {
  icon?: IconProps['name']
  title?: string
  /*
   * Кнопка в header'e справа
   * [роут или действие, Текст перед кнопкой]
   * TODO: Добавить типизацию роутов (не на первом этапе)
   */
  action?: [string | (() => void), string | undefined]
  variant?: 'card' | 'section'
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  variant: 'card',
})

const classname = computed(() => ([
  'widget',
  `widget-variant-${props.variant}`,
]))

const actionLabel = computed(() => props.action?.[1] ?? '')
const isHeadVisible = computed (() => Boolean(props.icon || props.title || props.action))

const handleActionClick = () => {
  const action = props.action?.[0]
  if (!action) return

  if (typeof action === 'function') {
    action()
  }
  else {
    navigateTo(action)
  }
}
</script>

<template>
  <div :class="classname">
    <div
      v-if="isHeadVisible"
      class="widget__head"
    >
      <div class="widget__title">
        <AppIcon
          v-if="icon"
          :name="icon"
          class="widget__title-icon"
        />
        <span class="widget__title-text">{{ title }}</span>
      </div>
      <div
        v-if="action"
        class="widget__action"
        type="button"
        @click="handleActionClick"
      >
        <span class="widget__action-text">{{ actionLabel }}</span>
        <AppButton
          class="widget__action-button"
          size="xs"
          variant="lined"
          color="lighter"
          icon="arrow_right"
        />
      </div>
    </div>
    <div class="widget__header">
      <slot name="header" />
    </div>
    <div class="widget__main">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.widget {
  $this: &;
  $variant-card: $this + '-variant-card';
  $variant-section: $this + '-variant-section';

  display: flex;
  flex-direction: column;
  gap: $space-4;
  padding: $space-4;

  &#{$variant-card} {
    border-radius: $space-8;
    background-color: #fff;
  }

  &#{$variant-section} {
    background-color: transparent;
  }

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: $space-8;
  }

  &__title {
    display: flex;
    gap: $space-3;
    align-items: center;

    &-icon {
      color: $color-neutral-light-500;
    }

    &-text {
      @include text(semiBold, xl);

      color: $color-neutral-light-950;

      &:empty {
        display: none;
      }
    }
  }

  &__action {
    display: flex;
    gap: $space-4;
    align-items: center;

    &-text {
      @include text(regular, sm);

      color: $color-neutral-light-400;

      &:empty {
        display: none;
      }
    }
  }

  &__header {
    &:empty {
      display: none;
    }
  }

  &__main {
    &:empty {
      display: none;
    }
  }
}
</style>
