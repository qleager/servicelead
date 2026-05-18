<script lang="ts" setup>
interface BreadcrumbItem {
  label: string
  to?: string
}

const route = useRoute()

const items = computed<BreadcrumbItem[]>(() => {
  return (route.meta.breadcrumbs as BreadcrumbItem[]) ?? []
})

export type { BreadcrumbItem }
</script>

<template>
  <div
    v-if="items.length"
    class="breadcrumbs"
  >
    <template
      v-for="(item, index) in items"
      :key="item.label"
    >
      <NuxtLink
        v-if="item.to"
        class="breadcrumbs__item"
        :to="item.to"
      >
        <div class="breadcrumbs__item-link">
          {{ item.label }}
        </div>
        <div
          v-if="index < items.length - 1"
          class="breadcrumbs__item-separator"
        >
          ·
        </div>
      </NuxtLink>
      <div
        v-else
        class="breadcrumbs__item"
      >
        {{ item.label }}
      </div>
    </template>
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

    display: flex;
    align-items: center;

    @include text(regular, xs);

    text-decoration: none;

    &-link {
      cursor: pointer;
      color: $color-neutral;

      &:hover {
        text-decoration: underline;
      }
    }

    &-separator {
      user-select: none;
      margin-left: $space-1;
      color: $color-neutral;
    }
  }
}
</style>
