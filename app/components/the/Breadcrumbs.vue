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

const isLink = (item: BreadcrumbItem) => !!item.to
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
        @click="!isLast(index) && isLink(item) ? navigateTo(item.to) : ''"
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

    @include text(regular, xs);

    color: $color-neutral;

    &#{$last} {
      color: $color-neutral-950;
    }

    &-label {
      cursor: pointer;
      padding-bottom: 2px;
      border-bottom: 1px solid transparent;

      &:hover {
        border-bottom: 1px solid $color-neutral;
      }

      #{$last} & {
        cursor: default;

        &:hover {
          border-bottom: 1px solid transparent;
        }
      }
    }

    &-dot {
      user-select: none;
    }
  }
}
</style>
