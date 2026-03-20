<script lang="ts" setup>
import type { EChartsOption } from 'echarts'
import type { CallbackDataParams } from 'echarts/types/dist/shared'
import type { OptionEncode } from 'echarts/types/src/util/types.js'
import type { VNodeChild } from 'vue'

interface Props {
  /**
   * Pie data including items and optional center values
   */
  data: Data<DataItem>
  /**
   * Field mapping for pie item name and value in the Data
   */
  encode: Encode<DataItem>
}

interface Slots {
  tooltip: (props: CallbackDataParams) => VNodeChild
}

type DataItem = Record<string, unknown>

interface Data<T extends DataItem> {
  items: T[]
  percent?: number | string
  total?: number | string
}

type EncodeKey<T extends DataItem> = Extract<keyof T, string | number>

interface Encode<T extends DataItem> extends OptionEncode {
  itemName: EncodeKey<T>
  value: EncodeKey<T>
}

const props = defineProps<Props>()

defineSlots<Slots>()

const option = computed<EChartsOption>(() => ({
  tooltip: {
    trigger: 'item',
  },
  dataset: {
    source: props.data.items,
  },
  series: [
    {
      type: 'pie',
      encode: props.encode,
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
}))

export type { Props as PieProps, Slots as PieSlots, Data as PieData, Encode as PieEncode }
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
          v-bind="params as CallbackDataParams"
        />
      </template>
    </VChart>
    <div
      v-if="data.total || data.percent"
      class="chart-pie__center"
    >
      <div
        v-if="data.total"
        class="chart-pie__value"
      >
        {{ data.total }}
      </div>
      <div
        v-if="data.percent"
        class="chart-pie__percent"
      >
        {{ data.percent }}
      </div>
    </div>
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
