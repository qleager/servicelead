<template>
  <AppCard class="statistics-thread">
    <template #content>
      <div class="statistics-thread__content">
        <AppTabs
          class="statistics-thread__tabs"
          :items="['День', 'Неделя', 'Месяц']"
          variant="link"
        >
          <template #listTrailing>
            <div class="statistics-thread__tabs-header-trailing">
              <div class="statistics-thread__tabs-caption">
                <b class="statistics-thread__tabs-caption-key">Вчера</b>
                <span class="statistics-thread__tabs-caption-value">12.03.2026</span>
              </div>
            </div>
          </template>
        </AppTabs>
        <StatisticsWidgetTraffic />
        <StatisticsWidgetLead />
        <StatisticsWidgetConversion />
        <StatisticsWidgetProfit />
      </div>
    </template>
  </AppCard>
</template>

<style lang="scss">
.statistics-thread {
  &__content {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: $space-4;
  }

  &__tabs {
    grid-column: span 4;
    width: 100%;
    margin-left: $space-4;

    &-header-trailing {
      display: flex;
      align-items: center;
      margin-left: auto;
      padding-right: $space-4;
    }

    &-caption {
      display: flex;
      gap: $space-2;

      &-key {
        @include text(semibold, xs);
      }

      &-value {
        @include text(regular, xs);
      }
    }
  }
}
</style>
