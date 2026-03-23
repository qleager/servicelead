<script lang="ts" setup>
import type { EChartsOption } from 'echarts'
import type { CallbackDataParams } from 'echarts/types/dist/shared'
import type { OptionEncode } from 'echarts/types/src/util/types.js'
import type { VNodeChild } from 'vue'

interface Props {
  /**
   * Data items for the bar
   */
  data: Data<DataItem>
  /**
   * Field mapping for x/y axes in the Data
   */
  encode: Encode<DataItem>
}

interface Slots {
  // TODO: а может ли тултип вернуть не CallbackDataParams? (когда возвращает массив: чекнуть тип TopLevelFormatterParams)
  tooltip: (props: CallbackDataParams) => VNodeChild
}

// IDEA: а как насчет просто массива значений? имеет смысл или заеб
type DataItem = Record<string, unknown>
type Data<T extends DataItem> = T[]

// TODO: Првореить на потенциальные проблемы
type EncodeAsixKey<T extends DataItem> = Extract<keyof T, string | number>
interface Encode<T extends DataItem> extends OptionEncode {
  x: EncodeAsixKey<T>
  y: EncodeAsixKey<T>
}

const props = defineProps<Props>()

defineSlots<Slots>()

const option = computed<EChartsOption>(() => {
  const data = props.data ?? []

  return {
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      containLabel: false,
    },
    tooltip: {
      trigger: 'item',
    },
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
        encode: props.encode,
      },
    ],
  }
})

export type { Props as BarProps, Slots as BarSlots, Data as BarData, Encode as BarEncode }
</script>

<template>
  <VChart :option>
    <template #tooltip="params">
      <slot
        name="tooltip"
        v-bind="(params as CallbackDataParams)"
      />
    </template>
  </VChart>
</template>
