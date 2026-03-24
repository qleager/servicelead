<script lang="ts" setup>
</script>

<template>
  <section class="page-dashboard">
    <AppCarousel class="page-dashboard__carousel" />
    <NewsWidget class="page-dashboard__news" />
    <StatisticsDashboard class="page-dashboard__statistics" />
    <DashboardControlPanel class="page-dashboard__controls" />
    <OfferWidget class="page-dashboard__offers" />
    <DashboardAddWidgetInformer class="page-dashboard__informer" />
  </section>
</template>

<style lang="scss">
.page-dashboard {
  $this: &;

  display: grid;
  grid-template:
    'carousel   carousel   carousel   news'
    'statistics statistics statistics statistics'
    'controls     controls     controls     controls'
    'offers     offers     offers     offers'
    'informer   informer   informer   informer'
  ;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 242px repeat(4, auto);
  gap: $space-6;

  &__carousel {
    grid-area: carousel;
  }

  &__news {
    grid-area: news;
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
