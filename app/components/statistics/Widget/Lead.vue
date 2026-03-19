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
    class="statistics-widget-lead"
    icon="rocket"
    title="Лиды"
    @click:button="navigateTo('/leads')"
  >
    <template #value>
      <div class="statistics-widget-lead__value">
        <div>
          60
        </div>
        <AppTag
          color="green"
          icon="arrow_up"
          trailing-icon
          variant="soft"
        >
          +7
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
.statistics-widget-lead {
  &__value {
    display: flex;
    gap: $space-1;
    align-items: flex-end;
    line-height: 1 !important;

    @include text(medium, 5xl);
  }
}
</style>
