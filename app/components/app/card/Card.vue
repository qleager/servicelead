<script lang="ts" setup>
import type { VNodeChild } from 'vue'

interface Props {
  description?: string
  title?: string
}

interface Slots {
  bottom?: () => VNodeChild
  content?: () => VNodeChild
  description?: () => VNodeChild
  footer?: () => VNodeChild
  header?: () => VNodeChild
  title?: () => VNodeChild
  top?: () => VNodeChild
}

defineProps<Props>()

defineSlots<Slots>()

export type { Slots as CardSlots }
</script>

<template>
  <div class="card">
    <div
      v-if="$slots.top"
      class="card__top"
    >
      <slot name="top" />
    </div>

    <div
      v-if="$slots.title || $slots.description || title || description"
      class="card__header"
    >
      <slot name="header">
        <div
          v-if="$slots.title || title"
          class="card__title"
        >
          <slot name="title">
            {{ title }}
          </slot>
        </div>

        <div
          v-if="$slots.description || description"
          class="card__description"
        >
          <slot name="description">
            {{ description }}
          </slot>
        </div>
      </slot>
    </div>

    <div
      v-if="$slots.content"
      class="card__content"
    >
      <slot name="content" />
    </div>

    <div
      v-if="$slots.footer"
      class="card__footer"
    >
      <slot name="footer" />
    </div>

    <div
      v-if="$slots.bottom"
      class="card__bottom"
    >
      <slot name="bottom" />
    </div>
  </div>
</template>

<style lang="scss">
.card {
  $this: &;

  display: flex;
  flex-direction: column;
  border-radius: $space-8;
  background-color: #fff;

  &__header {
    padding: $space-4;

    &:first-child {
      padding-top: $space-4;
    }
  }

  &__group-title {
    padding: $space-2 $space-4;
  }

  &__title {
    @include text(semibold, xl);
  }

  &__description {
    @include text(medium, xs);

    color: $color-neutral-400;
  }

  &__content {
    overflow: auto;
    flex: 1;
    padding: $space-2 $space-4;

    &:first-child {
      padding-top: $space-4;
    }

    &:last-child {
      padding-bottom: $space-4;
    }
  }

  &__footer {
    padding: $space-4;

    &:last-child {
      padding-bottom: $space-4;
    }
  }
}
</style>
