<script lang="ts" setup>
import type { TabsItem } from '~/components/App/Tabs.vue'

interface Filter {
  selectedTab: number
  searchQuery: string | null
  filters: {
    region: string[]
    city: string[]
    tools: string[]
    scenarios: string[]
  }
}

interface Emits {
  refresh: []
}

const emits = defineEmits<Emits>()

const model = defineModel<Filter>({
  required: true,
})

const isFiltersSlideoverVisible = ref(false)

const tabsItems = ref<TabsItem[]>([
  { label: 'Все', value: 1 },
  { label: 'Действует акция', value: 2 },
  { label: 'Топ офферы', value: 3 },
  { label: 'Избранные', value: 4 },
  { label: 'Новые', value: 5 },
])

const onUpdateFilters = (appliedFilters: Filter['filters']) => {
  console.log('Фильтры применены:', appliedFilters)
  Object.assign(model.value.filters, appliedFilters)
  emits('refresh')
}

export type { Filter as OffersFilter }
</script>

<template>
  <div class="offers-header">
    <div class="offers-header__title">
      Офферы
    </div>
    <div class="offers-header__filters">
      <OffersFilterTabs
        v-model="model.selectedTab"
        class="offers-header__filters-tabs"
        :items="tabsItems"
      />

      <div class="offers-header__filters-buttons">
        <OffersFilterSearch
          v-model="model.searchQuery"
        />

        <AppButton
          icon="filter"
          variant="lined"
          color="darker"
          @click="isFiltersSlideoverVisible = true"
        />
      </div>
    </div>
    <OffersFilterSlideover
      v-model="isFiltersSlideoverVisible"
      :filters="model.filters"
      @update="onUpdateFilters"
    />
  </div>
</template>

<style lang="scss">
.offers-header {
  display: flex;
  gap: $space-10;
  align-items: center;
  width: 100%;

  &__title {
    @include text(bold, 5xl);
  }

  &__filters {
    display: flex;
    gap: $space-10;
    justify-content: space-between;
    width: 100%;

    &-tabs {
      margin-right: auto;
    }

    &-buttons {
      display: flex;
      gap: $space-2;
    }
  }
}
</style>
