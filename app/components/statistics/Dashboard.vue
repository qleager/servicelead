<script lang="ts" setup></script>

<template>
  <AppCard class="statistics-dashboard">
    <template #content>
      <div class="statistics-dashboard__content">
        <AppTabs
          class="statistics-dashboard__tabs"
          color="neutral"
          :items="['День', 'Неделя', 'Месяц']"
          variant="link"
        >
          <template #listTrailing>
            <div class="statistics-dashboard__tabs-header-trailing">
              <div class="statistics-dashboard__tabs-caption">
                <b class="statistics-dashboard__tabs-caption-key">Вчера</b>
                <span class="statistics-dashboard__tabs-caption-value">12.03.2026</span>
              </div>
            </div>
          </template>
        </AppTabs>
        <StatisticsWidgetLead />
        <StatisticsWidgetConversion />
        <StatisticsWidgetConversionByTraffic />
        <StatisticsWidgetSummary class="statistics-dashboard__summary" />
      </div>
    </template>
  </AppCard>
</template>

<style lang="scss">
.statistics-dashboard {
  &__content {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: $space-6 $space-4;
  }

  &__summary {
    grid-column: span 3;
  }

  &__tabs {
    grid-column: span 3;
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
