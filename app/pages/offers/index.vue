<script lang="ts" setup>
const isFiltersVisible = ref<boolean>(false)

const items = [
  { label: 'Все', value: 1 },
  { label: 'Действует акция', value: 2 },
  { label: 'Топ офферы', value: 3 },
  { label: 'Избранные', value: 4 },
  { label: 'Новые', value: 5 },
]

const mockItems = [
  'Вариант 1',
  'Вариант 2',
  'Вариант 3',
  'Вариант 4',
]

const filters = reactive({
  region: [] as string[],
  city: [] as string[],
  tools: [] as string[],
  scenarios: [] as string[],
})

const isSearchVisible = ref<boolean>(false)
const searchQuery = ref<string | null>(null)

const isChanged = ref<boolean>(false)

watch(filters, () => {
  isChanged.value = true
}, { deep: true })

watch(isFiltersVisible, (open) => {
  if (open) isChanged.value = false
})

const resetFilters = () => {
  filters.region = []
  filters.city = []
  filters.tools = []
  filters.scenarios = []
}

const applyFilters = () => {
  if (!isChanged.value) return
  console.log('Фильтры применены:', { ...filters })

  isFiltersVisible.value = false
}

const toggleSearch = () => {
  isSearchVisible.value = !isSearchVisible.value

  if (!isSearchVisible.value) {
    searchQuery.value = null
  }
}

const closeSearch = () => {
  searchQuery.value = null
  isSearchVisible.value = false
}
</script>

<template>
  <div class="offers-head">
    <div class="offers-head__title">
      Офферы
    </div>
    <div class="offers-head__filters">
      <AppTabs
        :items="items"
        variant="lined"
        color="darker"
        class="offers-head__filters-tabs"
      />
      <div class="offers-head__filters-buttons">
        <AppInput
          v-if="isSearchVisible"
          v-model="searchQuery"
          reset
          rounded
          placeholder="Начните поиск"
          @reset="closeSearch"
        />
        <AppButton
          v-else
          icon="search"
          variant="lined"
          color="darker"
          @click="toggleSearch"
        />
        <AppButton
          icon="filter"
          variant="lined"
          color="darker"
          @click="isFiltersVisible = true"
        />
      </div>
    </div>
    <AppSlideover
      v-model="isFiltersVisible"
      title="Фильтры"
      icon="filter"
    >
      <AppSelect
        v-model="filters.region"
        :items="mockItems"
        multiple
        placeholder-mode="float"
        counter="list"
        search
        reset
        placeholder="Регион"
      />
      <AppSelect
        v-model="filters.city"
        :items="mockItems"
        multiple
        placeholder-mode="float"
        counter="list"
        search
        reset
        placeholder="Город"
      />
      <AppSelect
        v-model="filters.tools"
        :items="mockItems"
        multiple
        placeholder-mode="float"
        counter="list"
        search
        reset
        placeholder="Инструменты"
      />
      <AppSelect
        v-model="filters.scenarios"
        :items="mockItems"
        multiple
        placeholder-mode="float"
        counter="list"
        search
        reset
        placeholder="Сценарии"
      />
      <template #footer>
        <AppButton
          variant="nofilled"
          color="darker"
          @click="resetFilters"
        >
          Сбросить все
        </AppButton>
        <AppButton
          :disabled="!isChanged"
          @click="applyFilters"
        >
          Применить
        </AppButton>
      </template>
    </AppSlideover>
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
