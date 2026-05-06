<script lang="ts" setup>
interface Props {
  items: BreadcrumbItem[]
}

type BreadcrumbItem = {
  label: string
  to?: string
}

const props = defineProps<Props>()

const isLast = (index: number) => index + 1 === props.items.length
</script>

<template>
  <div class="breadcrumbs">
    <div
      v-for="(item, index) in items"
      :key="index"
      :class="[
        'breadcrumbs__item',
        {
          'breadcrumbs__item-last': isLast(index),
        },
      ]"
    >
      <div
        class="breadcrumbs__item-label"
        @click="!isLast(index) ? navigateTo(item.to) : ''"
      >
        {{ item.label }}
      </div>
      <div
        v-if="!isLast(index)"
        class="breadcrumbs__item-dot"
      >
        ·
      </div>
    </div>
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
    $last: $this + '-last';

    display: flex;
    align-items: center;
    color: $color-neutral;

    @include text(regular, xs);

    &-label {
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }

    &-dot {
      user-select: none;
    }

    &#{$last} {
      color: $color-neutral-950;

      #{$this} {
        &-label {
          cursor: default;

          &:hover {
            text-decoration: none;
          }
        }
      }
    }
  }
}
</style>
