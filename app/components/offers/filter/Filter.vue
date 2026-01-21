<script lang="ts" setup>
import type { TabsItem } from '~/components/app/Tabs.vue'

interface Emits {
  update: []
}

const emits = defineEmits<Emits>()

const model = defineModel<any>({
  required: true,
})

const isSearchInputExpanded = ref(false)

const tabsItems = ref<TabsItem[]>([
  { label: 'Все', value: 1 },
  { label: 'Действует акция', value: 2 },
  { label: 'Топ офферы', value: 3 },
  { label: 'Избранные', value: 4 },
  { label: 'Новые', value: 5 },
])

const onUpdateFilters = (newFilters: any) => {
  emits('update')
}

const onRemoveFilterValue = (valueToRemove: any) => {
  emits('update')
}

const resetSearch = () => {
  model.value.searchQuery = null
  isSearchInputExpanded.value = false
}
</script>

<template>
  <div class="offers-filter">
    <div class="offers-filter__filters">
      <div class="offers-filter__filters-active">
        <AppTabs
          v-model="model.selectedTab"
          class="offers-filter__filters-tabs"
          :items="tabsItems"
          variant="lined"
          color="neutral"
        />
        <div
          v-if="activeFilterValues?.length"
          class="offers-filter__filters-tags"
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

      <div class="offers-filter__filters-buttons">
        <div class="offers-filter__search">
          <AppInput
            v-if="isSearchInputExpanded"
            v-model="model.searchQuery"
            reset
            rounded
            placeholder="Начните поиск..."
            @reset="resetSearch"
          />
          <AppButton
            v-else
            icon="search"
            variant="lined"
            color="neutral"
            @click="isSearchInputExpanded = !isSearchInputExpanded"
          />
        </div>

        <OffersFilterSlideover
          :filters="model.filters"
          @update="onUpdateFilters"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.offers-filter {
  display: flex;
  gap: $space-10;
  width: 100%;

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
