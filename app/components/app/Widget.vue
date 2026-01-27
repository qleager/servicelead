<script lang="ts" setup>
import type { IconProps } from './Icon.vue'

// TODO: Если action не задан, показывать ошибку для actionText, что он не имеет смысла без action
interface Props {
  icon?: IconProps['name']
  title?: string
  description?: string
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

const slots = useSlots()

const props = withDefaults(defineProps<Props>(), {
  variant: 'card',
})

const emits = defineEmits<Emits>()

const classname = computed(() => ([
  'widget',
  `widget-variant-${props.variant}`,
]))
const isTitleVisible = computed(() => slots.title || props.title)
const isDescriptionVisible = computed(() => slots.description || props.description)
const isHeaderVisible = computed(() => isTitleVisible.value || isDescriptionVisible.value)
</script>

<template>
  <div :class="classname">
    <header
      v-if="isHeaderVisible"
      class="widget__header"
    >
      <div
        v-if="isTitleVisible"
        class="widget__header-title"
      >
        <AppIcon
          v-if="icon"
          :name="icon"
          class="widget__title-icon"
        />

        <div
          v-if="!$slots.title"
          class="widget__title"
        >
          {{ title }}
        </div>

        <div class="widget__slot widget__slot-title">
          <slot name="title" />
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

      <div
        v-if="isDescriptionVisible"
        class="widget__header-description"
      >
        <div
          v-if="!$slots.description"
          class="widget__description"
        >
          {{ description }}
        </div>

        <div class="widget__slot widget__slot-description">
          <slot name="description" />
        </div>
      </div>
    </header>

    <div class="widget__main">
      <slot />
    </div>

    <footer class="widget__footer">
      <div
        v-if="$slots.footer"
        class="widget__slot widget__slot-footer"
      >
        <slot name="footer" />
      </div>
    </footer>
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

  &#{$variant-card} {
    border-radius: $space-8;
    background-color: #fff;
  }

  &#{$variant-section} {
    padding: 0;
    background-color: transparent;
  }

  &__header {
    padding: $space-4 $space-4 0 $space-4;

    &-title {
      display: flex;
      gap: $space-3;
      align-items: center;
    }
  }

  &__title {
    @include text(semibold, xl);

    line-height: 1;

    &-icon {
      color: $color-neutral;
    }
  }

  &__description {
    @include text(medium, xs);

    color: $color-neutral-400;
  }

  &__action {
    cursor: pointer;

    display: flex;
    gap: $space-4;
    align-items: center;

    margin-left: auto;

    color: $color-neutral-400;

    transition: $blur-duration-sm;

    &:hover {
      color: $color-neutral;
      transition: $hover-duration-lg
    }

    &:focus {
      border: 1px solid red;
    }

    &:active {
      color: $color-neutral;
      transition: $active-duration-sm
    }

    &-text {
      @include text(regular, sm);

      &:empty {
        display: none;
      }
    }
  }

  &__main {
    overflow: hidden;
    display: flex;
    flex: 1;
    padding: 0 $space-4;

    &:empty {
      display: none;
    }

    &:first-child {
      padding-top: $space-4;
    }
  }

  &__footer {
    padding: 0 $space-4 $space-4;

    &:empty {
      display: none;
    }
  }
}
</style>
