<script lang="ts" setup>
import type { VNodeChild } from 'vue'
import type { ChartAsix, ChartData, ChartTooltipSlotProps } from '~/types/components/chart'
import { TOOLTIP_OPTIONS } from '~/constants/chart'

interface Props {
  /**
   * Field mapping for x/y axes in the Data
   */
  asix: ChartAsix
  data: ChartData
}

interface Slots {
  tooltip: (props: ChartTooltipSlotProps) => VNodeChild
}

const props = defineProps<Props>()

defineSlots<Slots>()

const option = computed(() => {
  const data = props.data ?? []

  return {
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      containLabel: false,
    },
    tooltip: { ...TOOLTIP_OPTIONS },
    dataset: {
      source: data,
    },
    xAxis: {
      type: 'category',
      axisLabel: { show: false },
      axisTick: { show: false },
      axisLine: { show: false },
    },
    yAxis: {
      type: 'value',
      axisLabel: { show: false },
      axisTick: { show: false },
      axisLine: { show: false },
      splitLine: { show: false },
    },
    series: [
      {
        type: 'bar',
        barCategoryGap: '4px',
        itemStyle: {
          color: '#E2E9FC',
          borderRadius: 8,
        },
        emphasis: {
          itemStyle: {
            color: '#0861EE',
          },
        },
        encode: props.asix,
      },
    ],
  }
})

export type { Props as BarProps, Slots as BarSlots, ChartData as BarData, ChartAsix as BarAsix }
</script>

<template>
  <VChart :option>
    <!-- @vue-expect-error: dataIndex и data на 100% обеспечены -->
    <template #tooltip="{ dataIndex, data: scopedData }">
      <slot
        :index="dataIndex"
        :item="scopedData"
        name="tooltip"
      />
    </template>
  </VChart>
</template>
