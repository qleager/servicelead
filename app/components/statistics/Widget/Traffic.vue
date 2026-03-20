<script lang="ts" setup>
import type { PieData, PieEncode } from '~/components/chart/Pie.vue'

// типа апи модель
type ApiStatisticsConversionItem = { label: string, value: number, data?: number[], huemae?: { text: string } }

// типа данные из апи
const data = ref<PieData<ApiStatisticsConversionItem>>({
  total: 10,
  percent: '100%',
  items: [
    { label: 'Calls', value: 4, data: [1, 2, 4] },
    { label: 'Forms', value: 6, huemae: { text: 'Accepted ' } },
  ],
})

const encode = ref<PieEncode<ApiStatisticsConversionItem>>({
  itemName: 'label',
  value: 'value',
})
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
        :data
        :encode
      >
        <template #tooltip="params">
          {{ params.name }}: {{ (params.data as ApiStatisticsConversionItem).value }}
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
}
</style>
