<script lang="ts" setup>
import type { VNodeChild } from 'vue'

interface Slots {
  header?: () => VNodeChild
  title?: () => VNodeChild
  subtitle?: () => VNodeChild
  content?: () => VNodeChild
  footer?: () => VNodeChild
}

defineSlots<Slots>()

export type { Slots as CardSlots }
</script>

<template>
  <div class="card">
    <header
      v-if="$slots.header"
      class="card__header"
    >
      <slot name="header" />
    </header>

    <div
      v-if="$slots.title && $slots.subtitle"
      class="card__group-title"
    >
      <div
        v-if="$slots.title"
        class="card__title"
      >
        <slot name="title" />
      </div>

      <div
        v-if="$slots.subtitle"
        class="card__subtitle"
      >
        <slot name="subtitle" />
      </div>
    </div>

    <div
      v-if="$slots.content"
      class="card__content"
    >
      <slot name="content" />
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

  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: $space-4;

  padding-block: $space-4;
  border-radius: $space-8;

  background-color: #fff;

  &__header {
    padding-inline: $space-4;
  }

  &__title {
    padding-inline: $space-4;

    @include text(semibold, xl);
  }

  &__subtitle {
    padding-inline: $space-4;

    @include text(medium, xs);

    color: $color-neutral-400;
  }

  &__content {
    padding-inline: $space-4;
  }

  &__footer {
    padding-inline: $space-4;
  }

  & > * {
    &:first-child {
      margin-block: -$space-4;
      padding: $space-4;
    }

    &:last-child {
      margin-block: -$space-4;
      padding: $space-4;
    }
  }
}
</style>
