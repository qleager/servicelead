<script lang="ts" setup>
</script>

<template>
  <section class="page-dashboard">
    <AppCarousel class="page-dashboard__carousel" />
    <FinanceBalanceWidget class="page-dashboard__balance" />
    <StatisticsDashboard class="page-dashboard__statistics" />
    <StatisticsLeadsWidget class="page-dashboard__leads" />
    <StatisticsOrdersWidget class="page-dashboard__orders" />
    <NewsWidget class="page-dashboard__news" />
    <FinanceIncomeWidget class="page-dashboard__income" />
    <StatisticsTrafficWidget class="page-dashboard__traffic" />
    <OffersWidget class="page-dashboard__offers" />
    <DashboardAddWidgetInformer class="page-dashboard__informer" />
  </section>
</template>

<style lang="scss">
.page-dashboard {
  $this: &;

  display: grid;
  grid-template:
    'carousel carousel carousel balance balance leads'
    'carousel carousel carousel balance balance orders'
    'statistics statistics statistics statistics statistics statistics'
    'news news news news news news'
    'income income income traffic traffic traffic'
    'offers offers offers offers offers offers'
    'help help help help help help'
  ;
  grid-template-columns: minmax(0, 1.4fr) repeat(4, minmax(0, 1fr)) minmax(0, 1.4fr);
  grid-template-rows: repeat(5, minmax(132px, auto));
  gap: $space-6;

  &__carousel {
    grid-area: carousel;
  }

  &__balance {
    grid-area: balance;
  }

  &__leads {
    grid-area: leads;
  }

  &__orders {
    grid-area: orders;
  }

  &__statistics {
    grid-area: statistics;
  }

  &__news {
    grid-area: news;
    max-height: 440px;
  }

  &__income {
    grid-area: income;
  }

  &__traffic {
    grid-area: traffic;
  }

  &__offers {
    grid-area: offers;
  }

  &__informer {
    grid-area: help;
    margin-bottom: -#{$space-6};
    padding-top: $space-10;
  }
}
</style>
