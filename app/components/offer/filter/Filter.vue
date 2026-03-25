<script lang="ts" setup>
import type { TabsItem } from '@components/app/Tabs.vue'

interface Emits {
  update: []
}

type Model = unknown

const emits = defineEmits<Emits>()

const model = defineModel<Model>({
  required: true,
})

const tabsItems = ref<TabsItem[]>([
  { label: 'Все проекты' },
  { label: 'Мастер на час' },
  { label: 'Бытовой ремонт' },
  { label: 'Универсальный' },
])

const resetItem = (item: unknown) => {
  emits('update')
}
</script>

<template>
  <div class="offer-filter">
    <div class="offer-filter__row">
      <OfferFilterSlideover />
      <div class="offer-filter__divider" />
      <AppTabs
        class="offer-filter__tabs"
        color="white"
        :items="tabsItems"
        variant="lined"
      />
    </div>

    <div
      v-if="true"
      class="offer-filter__selected"
    >
      <AppTag
        v-for="(value, index) in 5"
        :key="index"
        closable
        color="primary"
        variant="soft"
        @close="() => resetItem(value)"
      >
        {{ value }}
      </AppTag>
    </div>
  </div>
</template>

<style lang="scss">
.offer-filter {
  width: 100%;

  &__divider {
    height: 28px;
    margin: auto 0;
    border-left: 1px solid $color-neutral-300;
  }

  &__row {
    display: flex;
    gap: $space-4;
    align-items: center;
    margin-bottom: $space-4;
  }

  &__tabs {
    margin-right: auto;

    &-item {
      &-image {
        width: 24px;
        height: 24px;
        margin-inline: -$space-2;
      }
    }
  }

  &__selected {
    display: flex;
    gap: $space-2;
    order: 1;
  }
}
</style>
