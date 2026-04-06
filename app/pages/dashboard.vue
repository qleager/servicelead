<script lang="ts" setup>
import type { TabsItem } from '~/components/app/Tabs.vue'

const tabs: TabsItem[] = [
  { label: 'Все проекты', value: 'all' },
  { label: 'Мастер на час', value: 'master' },
  { label: 'Бытовой ремонт', value: 'byt_rem' },
  { label: 'Универсальный', value: 'universal' },
]
</script>

<template>
  <section class="page-dashboard">
    <AppCarousel class="page-dashboard__carousel" />
    <NewsWidget class="page-dashboard__news" />

    <!-- Start: filtration -->
    <AppTabs
      class="page-dashboard__tabs"
      color="white"
      :items="tabs"
    >
      <template #trailing="{ item }">
        <AppTag
          v-if="item.value !== 'all'"
          color="neutral"
          size="sm"
        >
          32%
        </AppTag>
      </template>
    </AppTabs>
    <StatisticsDashboard class="page-dashboard__statistics" />
    <DashboardControlPanel class="page-dashboard__controls" />
    <OfferWidget class="page-dashboard__offers" />
    <!-- End: filtration -->

    <DashboardAddWidgetInformer class="page-dashboard__informer" />
  </section>
</template>

<style lang="scss">
.page-dashboard {
  $this: &;

  display: grid;
  grid-template:
    'carousel   carousel   carousel   news'
    'tabs       tabs       tabs       tabs'
    'statistics statistics statistics statistics'
    'controls   controls   controls   controls'
    'offers     offers     offers     offers'
    'informer   informer   informer   informer'
  ;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 242px repeat(4, auto);
  gap: $space-9;

  &__carousel {
    grid-area: carousel;
  }

  &__news {
    grid-area: news;
  }

  &__tabs {
    grid-area: tabs;
    margin-bottom: -$space-4;
  }

  &__statistics {
    grid-area: statistics;
  }

  &__controls {
    grid-area: controls;
  }

  &__offers {
    grid-area: offers;
  }

  &__informer {
    grid-area: informer;
    margin-top: $space-10;
  }
}
</style>
