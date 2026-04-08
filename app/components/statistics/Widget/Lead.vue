<script lang="ts" setup>
import type { BarAsix, BarData } from '~/components/chart/Bar.vue'

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

const asix = ref<BarAsix<ApiStatisticsLeadItem>>({ x: 'label', y: 'value' })
</script>

<template>
  <StatisticsWidgetBase
    class="statistics-widget-lead"
    icon="rocket"
    title="Лиды"
  >
    <template #trailingHeader>
      <AppButton
        class="widget__button"
        color="neutral"
        icon="arrow_right"
        size="xs"
        variant="outline"
        @click="navigateTo('/leads')"
      />
    </template>
    <template #value>
      <AppLabeledValue
        class="statistics-widget-lead__value"
        size="lg"
        value="60"
      >
        <template #trailingValue>
          <AppTag
            color="green"
            icon="arrow_up"
            size="sm"
            trailing-icon
            variant="soft"
          >
            +7
          </AppTag>
        </template>
      </AppLabeledValue>
    </template>
    <template #chart>
      <ChartBar
        :asix
        class="statistics-widget-lead__chart"
        :data
      >
        <template #tooltip="{ item }">
          <div class="statistics-widget-lead__chart-tooltip">
            <div>{{ item.label }}</div>
            <div class="statistics-widget-lead__chart-tooltip-divider" />
            <div>{{ item.value }}</div>
          </div>
        </template>
      </ChartBar>
    </template>
  </StatisticsWidgetBase>
</template>

<style lang="scss">
.statistics-widget-lead {
  &__chart {
    max-width: 210px;
    margin-left: auto;

    &-tooltip {
      display: flex;

      @include text(medium, xs);

      line-height: 1;
      color: $color-neutral-950;

      &-divider {
        min-width: 60px;
        border-bottom: 1px dashed $color-neutral-200;
      }
    }
  }
}
</style>
