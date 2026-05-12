<script lang="ts" setup>
import type { VNodeChild } from 'vue'
import type { ChartData, ChartTooltipSlotProps } from '~/types/components/chart'
import { TOOLTIP_OPTIONS } from '~/constants/chart'

interface Props {
  /**
   * Caption on the center of Pie
   */
  caption?: string
  data: ChartData
  /**
   * Title on the center of Pie
   */
  title?: string
}

interface Slots {
  tooltip: (props: ChartTooltipSlotProps) => VNodeChild
}

const props = defineProps<Props>()

defineSlots<Slots>()

const option = computed(() => {
  const items = props.data ?? []

  return {
    tooltip: { ...TOOLTIP_OPTIONS },
    series: [{
      type: 'pie',
      radius: ['55.6%', '100%'],
      padAngle: 2,
      emphasis: {
        scale: false,
      },
      label: {
        show: false,
      },
      data: items.map(item => ({
        ...item,
        itemStyle: {
          color: item.color?.initial ?? '#E2E9FC',
          borderRadius: 8,
        },
        emphasis: {
          itemStyle: {
            color: item.color?.emphasis ?? '#0861EE',
            borderRadius: 8,
          },
        },
      })),
    }],
    title: {
      show: Boolean(props.title || props.caption),
      text: `{value|${props.title ?? ''}}\n{label|${props.caption ?? ''}}`,
      top: 'middle',
      textStyle: {
        rich: {
          value: {
            fontSize: 18,
            fontWeight: 500,
            fontFamily: 'Manrope',
            color: '#121522',
            lineHeight: 24,
          },
          label: {
            fontSize: 10,
            fontWeight: 400,
            fontFamily: 'Manrope',
            color: '#9EA6C8',
            lineHeight: 14,
          },
        },
      },
    },
  }
})

export type { Props as PieProps, Slots as PieSlots, ChartData as PieData }
</script>

<template>
  <div class="chart-pie">
    <VChart
      autoresize
      class="chart-pie__canvas"
      :option
    >
      <!-- @vue-expect-error: dataIndex и data на 100% обеспечены -->
      <template #tooltip="{ dataIndex, data: scopedData }">
        <slot
          :index="dataIndex"
          :item="scopedData"
          name="tooltip"
        />
      </template>
    </VChart>
  </div>
</template>

<style lang="scss">
  .chart-pie {
    $this: &;

    width: 117px;
    height: 117px;

    &__canvas {
      width: 100%;
      height: 100%;
    }
  }
</style>
