<script lang="ts" setup>
import type { EChartsOption } from 'echarts'
import type { CallbackDataParams } from 'echarts/types/dist/shared'
import type { VNodeChild } from 'vue'

interface Props {
  caption?: string
  /**
   * Pie data including items and optional center values
   */
  data: Data<DataItem>
  title?: string
}

interface Slots {
  // TODO: а может ли тултип вернуть не CallbackDataParams? (когда возвращает массив: чекнуть тип TopLevelFormatterParams)
  tooltip: (props: CallbackDataParams) => VNodeChild
}

// IDEA: а как насчет просто массива значений? имеет смысл или заеб
type DataItem = Record<string, unknown>
type Data<T extends DataItem> = T[]

const props = defineProps<Props>()

defineSlots<Slots>()

const option = computed<EChartsOption>(() => {
  const data = props.data ?? []

  return {
    tooltip: {
      trigger: 'item',
    },
    dataset: {
      source: data,
    },
    series: [
      {
        type: 'pie',
        radius: ['55.6%', '100%'],
        itemStyle: {
          color: '#E9EEFB',
          borderRadius: 8,
          borderColor: '#F3F6FE',
          borderWidth: 2,
        },
        emphasis: {
          scale: false,
          itemStyle: {
            color: '#0861EE',
          },
        },
        label: {
          show: false,
        },
      },
    ],
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

export type { Props as PieProps, Slots as PieSlots, Data as PieData }
</script>

<template>
  <div class="chart-pie">
    <VChart
      autoresize
      class="chart-pie__canvas"
      :option
    >
      <template #tooltip="params">
        <slot
          name="tooltip"
          v-bind="(params as CallbackDataParams)"
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
