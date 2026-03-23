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
      left: 'center',
      top: 'center',
      textAlign: 'center',
      textStyle: {
        rich: {
          value: {
            fontSize: 15,
            fontWeight: 700,
            color: '#222',
            lineHeight: 34,
          },
          label: {
            fontSize: 12,
            color: '#888',
            lineHeight: 20,
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

    position: relative;
    width: 117px;
    height: 117px;

    &__canvas {
      width: 100%;
      height: 100%;
    }

    &__center {
      pointer-events: none;

      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      display: flex;
      flex-direction: column;
      align-items: center;
    }

    &__value {
      @include text(medium, lg);

      line-height: 1.4;
      color: $color-neutral-950;
    }

    &__percent {
      @include text(regular, 2xs);

      line-height: 1.4;
      color: $color-neutral-400;
    }
  }
</style>
