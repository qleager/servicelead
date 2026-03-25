<script lang="ts" setup>
import type { BarAsix, BarData } from '~/components/chart/Bar.vue'

interface Props {
  isFilterVisible?: boolean
}
// типа апи модель
type ApiStatisticsLeadItem = { label: string, value: number, data?: number[], huemae?: { text: string } }

defineProps<Props>()

const filterPeriod = ref('День')
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
    class="statistics-widget-conversion"
    icon="higher_conversion"
    title="Конверсии"
  >
    <template #trailingHeader>
      <AppSelect
        v-if="!isFilterVisible"
        v-model="filterPeriod"
        class="statistics-widget-conversion__select"
        :items="['День', 'Неделя', 'Месяц', 'Год']"
        rounded
        size="sm"
      />
    </template>
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
        :asix
        class="statistics-widget-conversion__chart"
        :data
      >
        <template #tooltip="{ item }">
          <div class="statistics-widget-conversion__chart-tooltip">
            <div>{{ item.label }}</div>
            <div class="statistics-widget-conversion__chart-tooltip-divider" />
            <div>{{ item.value }}</div>
          </div>
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

  &__number {
    @include text(medium, 5xl);

    line-height: 1;
  }

  &__select {
    width: fit-content;
  }
}
</style>
