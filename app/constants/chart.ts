import type { TooltipComponentOption } from 'echarts'

export const TOOLTIP_OPTIONS = {
  trigger: 'item',
  renderMode: 'html',
  borderRadius: 8,
  borderColor: 'transparent',
  padding: 16,
  appendToBody: true,
  extraCssText: `
    box-shadow: 0px 0px 35px 0px #1C265A1A;
  `,
} satisfies TooltipComponentOption
