<script lang="ts" setup>
import type { PieData } from '~/components/chart/Pie.vue'

// типа апи модель
type ApiStatisticsTrafficItem = { label: string, value: number, data?: number[], huemae?: { text: string } }

// типа данные из апи
const data = ref<PieData<ApiStatisticsTrafficItem>>([
  { label: 'Звонки', value: 4, data: [1, 2, 4] },
  { label: 'Формы', value: 6, huemae: { text: 'Accepted ' } },
])
</script>

<template>
  <StatisticsWidgetBase
    class="statistics-widget-traffic"
    icon="pie_chart"
    title="Конверсии по трафику"
  >
    <template #value>
      <div class="statistics-widget-traffic__values">
        <div class="statistics-widget-traffic__metric">
          <div class="statistics-widget-traffic__head">
            <AppChip
              color="neutral"
              size="xs"
              standalone
            />
            <div class="statistics-widget-traffic__label">
              Формы
            </div>
          </div>
          <div class="statistics-widget-traffic__amount">
            <div class="statistics-widget-traffic__number">
              46
            </div>
            <div class="statistics-widget-traffic__unit">
              %
            </div>
          </div>
        </div>

        <div class="statistics-widget-traffic__metric">
          <div class="statistics-widget-traffic__head">
            <AppChip
              color="primary"
              size="xs"
              standalone
            />
            <div class="statistics-widget-traffic__label">
              Звонки
            </div>
          </div>
          <div class="statistics-widget-traffic__amount">
            <div class="statistics-widget-traffic__number">
              54
            </div>
            <div class="statistics-widget-traffic__unit">
              %
            </div>
          </div>
        </div>
      </div>
    </template>

    <template #chart>
      <ChartPie
        caption="100%"
        :data
        title="10"
      >
        <template #tooltip="{ value }">
          <div
            v-for="item in data"
            :key="item.value + item.label"
            :class="{
              'statistics-widget-traffic__tooltip-item': true,
              'statistics-widget-traffic__tooltip-item-active': item.label === (value as ApiStatisticsTrafficItem).label,
            }"
          >
            <div>{{ (item as ApiStatisticsTrafficItem).label }}</div>
            <div class="statistics-widget-traffic__tooltip-divider" />
            <div>{{ (item as ApiStatisticsTrafficItem).value }}</div>
          </div>
        </template>
      </ChartPie>
    </template>
  </StatisticsWidgetBase>
</template>

<style lang="scss">
.statistics-widget-traffic {
  $this: &;

  &__values {
    display: flex;
    gap: $space-6;
  }

  &__head {
    display: flex;
    gap: $space-2;
    align-items: center;
  }

  &__label {
    @include text(normal, xs);

    text-transform: uppercase;
  }

  &__amount {
    display: flex;
    gap: $space-05;
    align-items: flex-end;
  }

  &__number {
    @include text(medium, 5xl);

    line-height: 1.075;
  }

  &__unit {
    @include text(medium, xl);

    margin-bottom: $space-05;
    line-height: 1.35;
  }

  &__tooltip {
    &-item {
      display: flex;
      align-items: center;

      line-height: 1.33;
      color: $color-neutral-950;

      opacity: .33;

      @include text(medium, xs);

      &:not(:first-child) {
        margin-top: $space-2;
      }

      &-active {
        opacity: 1;
      }
    }

    &-divider {
      min-width: 60px;
      height: 10px;
      border-bottom: 1px dashed $color-neutral-200;
    }
  }
}
</style>
