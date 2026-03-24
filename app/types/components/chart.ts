import type { OptionEncode } from 'echarts/types/src/util/types.js'

export type ChartDataItem<T = Record<string, unknown>> = {
  /**
   * Segment colors for default and emphasis states
   *
   * @defaultvalue `{ initial: '#E2E9FC', emphasis: '#0861EE' }`
   */
  color?: {
    /**
     * Base segment color
     *
     * @defaultvalue `'#E2E9FC'`
     */
    initial: string
    /**
     * Segment color on hover/active state
     *
     * @defaultvalue `'#0861EE'`
     */
    emphasis: string
  }
  /**
   * Numeric value used to calculate segment size
   */
  value: string | number
  /**
   * Segment label/title
   */
  label: string
} & T

export type ChartData<I = Record<string, unknown>> = ChartDataItem<I>[]

export type ChartTooltipSlotProps = { item: ChartDataItem, index: number }

type EncodeAsixKey<T extends ChartDataItem> = Extract<keyof T, string | number>

export interface ChartAsix<T extends ChartDataItem = ChartDataItem> extends OptionEncode {
  x: EncodeAsixKey<T>
  y: EncodeAsixKey<T>
}
