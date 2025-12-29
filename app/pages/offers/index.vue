<script lang="ts" setup>
import type { TabsItem } from '~/components/App/Tabs.vue'

const isFiltersVisible = ref<boolean>(false)

const items = ref<TabsItem[]>([
  { label: 'Все', value: 1 },
  { label: 'Действует акция', value: 2 },
  { label: 'Топ офферы', value: 3 },
  { label: 'Избранные', value: 4 },
  { label: 'Новые', value: 5 },
])

const filters = reactive({
  region: [] as string[],
  city: [] as string[],
  tools: [] as string[],
  scenarios: [] as string[],
})

const selectedTab = ref(items.value[0]?.value)

const searchQuery = ref<string | null>(null)

const { data: offers, refresh, pending } = await useAsyncData(
  'offers',
  () => {
    console.log({
      tab: selectedTab.value,
      search: searchQuery.value,
      filters: { ...filters },
    })
    console.log('fetchOffers')
  },
  {
    server: false,
    lazy: true,
    watch: [selectedTab, searchQuery, filters],
    default: () => [],
  },
)

const onApplyFilters = (appliedFilters: typeof filters) => {
  console.log('Фильтры применены:', appliedFilters)
  Object.assign(filters, appliedFilters)
}
</script>

<template>
  <div class="offers-head">
    <div class="offers-head__title">
      Офферы
    </div>
    <div class="offers-head__filters">
      <OffersFilterTabs
        v-model="selectedTab"
        class="offers-head__filters-tabs"
        :items="items"
      />

      <div class="offers-head__filters-buttons">
        <OffersFilterSearch
          v-model="searchQuery"
        />

        <AppButton
          icon="filter"
          variant="lined"
          color="darker"
          @click="isFiltersVisible = true"
        />
      </div>
    </div>
    <OffersFilterSlideover
      v-model="isFiltersVisible"
      :filters="filters"
      @apply="onApplyFilters"
    />
  </div>
</template>

<style lang="scss">
.offers-head {
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
