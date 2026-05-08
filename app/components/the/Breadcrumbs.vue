<script lang="ts" setup>
import { useBreadcrumbs } from '~/composables/useBreadcrumbs'

const { items } = useBreadcrumbs()
</script>

<template>
  <div class="breadcrumbs">
    <NuxtLink
      v-for="(item, index) in items"
      :key="index"
      active-class="breadcrumbs__item--active"
      class="breadcrumbs__item"
      :to="item.to"
    >
      <div class="breadcrumbs__item-label">
        {{ item.label }}
      </div>
      <div class="breadcrumbs__item-dot">
        ·
      </div>
    </NuxtLink>
  </div>
</template>

<style lang="scss">
.breadcrumbs {
  display: flex;
  gap: $space-1;
  align-items: center;
  margin-bottom: $space-3;

  &__item {
    $this: &;
    $last: $this + '--active';

    display: flex;
    align-items: center;

    @include text(regular, xs);

    color: $color-neutral;
    text-decoration: none;

    &#{$last} {
      pointer-events: none;
      color: $color-neutral-950;
    }

    &-label {
      cursor: pointer;
      color: $color-neutral;

      &:hover {
        text-decoration: underline;
      }

      #{$last} & {
        cursor: default;
        color: $color-neutral-950;

        &:hover {
          text-decoration: none;
        }
      }
    }

    &-dot {
      user-select: none;

      #{$last} & {
        display: none;
      }
    }
  }
}
</style>
