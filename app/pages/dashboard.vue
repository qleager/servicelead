<script lang="ts" setup>
</script>

<template>
  <section class="page-dashboard">
    <AppCarousel class="page-dashboard__carousel" />
    <StatisticsDashboard class="page-dashboard__statistics" />
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
    'offers     offers     offers     offers'
    'informer   informer   informer   informer'
  ;
  grid-template-columns: repeat(4, 1fr);
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

  &__offers {
    grid-area: offers;
  }

  &__informer {
    grid-area: informer;
    margin-top: $space-10;
  }
}
</style>
