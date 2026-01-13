<script lang="ts" setup>
import type { IconProps } from './Icon.vue'

// TODO: Если action не задан, показывать ошибку для actionText, что он не имеет смысла без action
interface Props {
  icon?: IconProps['name']
  title?: string
  /**
   * Text on the action button
   *
   * @defaultvalue undefined
   */
  actionText?: string
  /**
   * Whether to show the action button
   *
   * @defaultvalue false
   */
  action?: boolean
  /**
   * Widget layout variant
   *
   * - `'card'`         – like article/widget
   * - `'section'`      – like section/block of site
   *
   * @defaultvalue `'card'`
   */
  variant?: 'card' | 'section'
}

interface Emits {
  actionClick: []
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'card',
})

const emits = defineEmits<Emits>()

const classname = computed(() => ([
  'widget',
  `widget-variant-${props.variant}`,
]))

const isHeadVisible = computed (() => Boolean(props.icon || props.title || props.action))
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
        role="button"
        @click="emits('actionClick')"
      >
        <span class="widget__action-text">{{ actionText }}</span>
        <AppButton
          class="widget__action-button"
          size="xs"
          variant="lined"
          color="neutral"
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

  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: $space-4;

  padding: $space-4;

  &#{$variant-card} {
    border-radius: $space-8;
    background-color: #fff;
  }

  &#{$variant-section} {
    padding: 0;
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
      color: $color-neutral-500;
    }

    &-text {
      @include text(semiBold, xl);

      color: $color-neutral-950;

      &:empty {
        display: none;
      }
    }
  }

  &__action {
    cursor: pointer;

    display: flex;
    gap: $space-4;
    align-items: center;

    color: $color-neutral-400;

    transition: $blur-duration-sm;

    &:hover {
      color: $color-neutral-500;
      transition: $hover-duration-lg
    }

    &:focus {
      border: 1px solid red;
    }

    &:active {
      color: $color-neutral-500;
      transition: $active-duration-sm
    }

    &-text {
      @include text(regular, sm);

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
    overflow: hidden;
    display: flex;
    flex: 1;

    &:empty {
      display: none;
    }
  }
}
</style>
