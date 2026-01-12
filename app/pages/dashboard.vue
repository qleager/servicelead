<script lang="ts" setup>
</script>

<template>
  <section class="page-dashboard">
    <AppCarousel class="page-dashboard__carousel" />
    <FinanceBalanceWidget class="page-dashboard__balance" />
    <StatisticsLeadsWidget class="page-dashboard__leads" />
    <StatisticsOrdersWidget class="page-dashboard__orders" />
    <StatisticsWidget class="page-dashboard__statistics" />
    <NewsWidget class="page-dashboard__news" />
    <FinanceIncomeWidget class="page-dashboard__income" />
    <StatisticsTrafficWidget class="page-dashboard__traffic" />
    <OffersWidget class="page-dashboard__offers" />
    <div class="page-dashboard__collapsers">
      <div class="collapsers-item collapsers-item--1">
        <AppCollapse>
          <div class="collapsers-item__header">
            <div>Выполняем</div>
          </div>
        </AppCollapse>
      </div>
      <div class="collapsers-item collapsers-item--2">
        <AppCollapse>
          <div class="collapsers-item__header">
            <div>Выполняем</div>
            <AppIcon name="dropdown" />
          </div>
        </AppCollapse>
      </div>
    </div>
    <DashboardAddWidgetInformer class="page-dashboard__informer" />
  </section>
</template>

<style lang="scss">
.collapsers-item {
  width: 50%;
  padding: $space-6;
  border-radius: $radius-4;

  &__header {
    display: flex;
    gap: $space-4;
    justify-content: space-between;
  }

  &--1 {
    background: $color-red-200;
  }

  &--2 {
    background: $color-primary-200;
  }
}

.page-dashboard {
  $this: &;

  display: grid;
  grid-template:
    'carousel carousel carousel balance balance leads'
    'carousel carousel carousel balance balance orders'
    'statistics statistics statistics statistics news news'
    'income income income traffic traffic traffic'
    'offers offers offers offers offers offers'
    'collapsers collapsers collapsers collapsers collapsers collapsers'
    'help help help help help help'
  ;
  grid-template-columns: minmax(0, 1.4fr) repeat(4, minmax(0, 1fr)) minmax(0, 1.4fr);
  grid-template-rows: repeat(5, minmax(132px, auto));
  gap: $space-6;

  &__collapsers {
    display: flex;
    grid-area: collapsers;
    gap: $space-10;
    justify-content: space-between;

    min-width: 100%;
  }

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
