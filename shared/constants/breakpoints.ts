/**
 * Strategy: max-width
 */
export const BREAKPOINTS = {
  'xs': 639,
  'sm': 767,
  'md': 1023,
  'lg': 1279,
  'xl': 1535,
  '2xl': 9999,
} as const

export type BreakpointKey = keyof typeof BREAKPOINTS
