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

const activeFiltersCount = computed(() => {
  return Object.values(model.value.filters).filter(
    value => Array.isArray(value) && value.length > 0,
  ).length
})

const activeFilterValues = computed(() => {
  const filters = model.value.filters
  return Object.values(filters).flat().filter(Boolean) as string[]
})

const onRemoveFilterValue = (valueToRemove: string) => {
  const newFilters: Filter['filters'] = { ...model.value.filters }

  for (const key in newFilters) {
    if (newFilters[key as keyof typeof newFilters].includes(valueToRemove)) {
      newFilters[key as keyof typeof newFilters]
        = newFilters[key as keyof typeof newFilters].filter(v => v !== valueToRemove)
    }
  }

  model.value.filters = newFilters
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
      <div class="offers-header__filters-active">
        <OffersFilterTabs
          v-model="model.selectedTab"
          class="offers-header__filters-tabs"
          :items="tabsItems"
        />
        <div
          v-if="activeFilterValues.length"
          class="offers-header__filters-tags"
        >
          <AppTag
            v-for="(value, index) in activeFilterValues"
            :key="index"
            closable
            color="white"
            @close="() => onRemoveFilterValue(value)"
          >
            {{ value }}
          </AppTag>
        </div>
      </div>

      <div class="offers-header__filters-buttons">
        <OffersFilterSearch
          v-model="model.searchQuery"
        />

        <AppButton
          icon="filter"
          variant="lined"
          color="neutral"
          @click="isFiltersSlideoverVisible = true"
        >
          <!-- TODO: заменить на AppIndicator -->
          <AppTag
            v-if="activeFiltersCount > 0"
            color="white"
          >
            {{ activeFiltersCount }}
          </AppTag>
        </AppButton>
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
  width: 100%;

  &__title {
    @include text(bold, 5xl);
  }

  &__filters {
    display: flex;
    gap: $space-10;
    justify-content: space-between;
    width: 100%;

    &-active {
      display: flex;
      flex-direction: column;
      gap: $space-2;
      max-width: 700px;
    }

    &-tabs {
      margin-right: auto;
    }

    &-tags {
      display: flex;
      flex-wrap: wrap;
      gap: $space-2;
    }

    &-buttons {
      display: flex;
      gap: $space-2;
    }
  }
}
</style>
