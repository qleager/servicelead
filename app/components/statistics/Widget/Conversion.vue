<script lang="ts" setup>
import type { BarData, BarEncode } from '~/components/chart/Bar.vue'

// типа апи модель
type ApiStatisticsLeadItem = { label: string, value: number, data?: number[], huemae?: { text: string } }

// типа данные из апи
const data = ref<BarData<ApiStatisticsLeadItem>>([
  { label: 'Mon', value: 12, data: [1, 2, 4] },
  { label: 'Tue', value: 22, huemae: { text: 'Accepted ' } },
  { label: 'Wed', value: 18 },
  { label: 'Thu', value: 9 },
  { label: 'Fri', value: 27 },
  { label: 'Sat', value: 14 },
  { label: 'Sun', value: 20 },
])

const encode = ref<BarEncode<ApiStatisticsLeadItem>>({ x: 'label', y: 'value' })
</script>

<template>
  <StatisticsWidgetBase
    class="statistics-widget-conversion"
    icon="target"
    title="Конверсии"
  >
    <template #value>
      <div class="statistics-widget-conversion__values">
        <div class="statistics-widget-conversion__number">
          10
        </div>
        <AppTag
          color="green"
          icon="arrow_up"
          size="sm"
          trailing-icon
          variant="soft"
        >
          +5
        </AppTag>
      </div>
    </template>
    <template #chart>
      <ChartBar
        :data
        :encode
      >
        <template #tooltip="{ value }">
          {{ value }}
        </template>
      </ChartBar>
    </template>
  </StatisticsWidgetBase>
</template>

<style lang="scss">
.statistics-widget-conversion {
  $this: &;

  &__values {
    display: flex;
    gap: $space-1;
    align-items: flex-end;
  }

  &__number {
    @include text(medium, 5xl);

    line-height: 1;
  }
}
</style>
