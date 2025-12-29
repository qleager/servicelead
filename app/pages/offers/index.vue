<script lang="ts" setup>
import type { TabsItem } from '~/components/App/Tabs.vue'

const isFiltersSlideoverVisible = ref<boolean>(false)

const tabsItems = ref<TabsItem[]>([
  { label: 'Все', value: 1 },
  { label: 'Действует акция', value: 2 },
  { label: 'Топ офферы', value: 3 },
  { label: 'Избранные', value: 4 },
  { label: 'Новые', value: 5 },
])

const selectedTab = ref(tabsItems.value[0]?.value)

const offersFilters = reactive({
  region: [] as string[],
  city: [] as string[],
  tools: [] as string[],
  scenarios: [] as string[],
})

const searchQuery = ref<string | null>(null)

const onApplyFilters = (appliedFilters: typeof offersFilters) => {
  console.log('Фильтры применены:', appliedFilters)
  Object.assign(offersFilters, appliedFilters)
}

const { data: offers, refresh, pending } = await useAsyncData(
  'offers',
  () => {
    console.log({
      tab: selectedTab.value,
      search: searchQuery.value,
      filters: { ...offersFilters },
    })
    console.log('fetchOffers')
  },
  {
    server: false,
    lazy: true,
    watch: [selectedTab, searchQuery, offersFilters],
    default: () => [],
  },
)
</script>

<template>
  <div class="offers">
    <div class="offers__projects">
      Проекты
    </div>
    <div class="offers__header">
      <div class="offers__title">
        Офферы
      </div>
      <div class="offers__filters">
        <OffersFilterTabs
          v-model="selectedTab"
          class="offers__filters-tabs"
          :items="tabsItems"
        />

        <div class="offers__filters-buttons">
          <OffersFilterSearch
            v-model="searchQuery"
          />

          <AppButton
            icon="filter"
            variant="lined"
            color="darker"
            @click="isFiltersSlideoverVisible = true"
          />
        </div>
      </div>
    </div>
    <div class="offers__items">
      Сетка офферов
    </div>
    <OffersFilterSlideover
      v-model="isFiltersSlideoverVisible"
      :filters="offersFilters"
      @apply="onApplyFilters"
    />
  </div>
</template>

<style lang="scss">
.offers {
  display: flex;
  flex-direction: column;
  gap: $space-9;

  &__header {
    display: flex;
    gap: $space-10;
    align-items: center;
    width: 100%;
  }

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
