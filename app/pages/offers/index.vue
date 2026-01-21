<script lang="ts" setup>
import type { OffersFilter } from '~/components/offers/filter/index.vue'

const route = useRoute()

const offersFilter = reactive<OffersFilter>({
  selectedTab: typeof route.query.tab === 'string' ? Number(route.query.tab) : 1,
  searchQuery: null,
  filters: { region: [], city: [], tools: [], scenarios: [] },
})

const { data: offers, refresh, pending } = await useAsyncData(
  'offers',
  () => {
    console.log({
      tab: offersFilter.selectedTab,
      search: offersFilter.searchQuery,
      filters: offersFilter.filters,
    })
    console.log('fetchOffers')
  },
  {
    server: false,
    lazy: true,
    watch: [
      () => offersFilter.selectedTab,
      () => offersFilter.searchQuery,
    ],
    default: () => [],
  },
)
</script>

<template>
  <div class="offers">
    <div class="offers__projects">
      Проекты
    </div>
    <OffersFilter
      v-model="offersFilter"
      @refresh="refresh"
    />
    <div class="offers__items">
      Сетка офферов
    </div>
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
