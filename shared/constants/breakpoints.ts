export const BREAKPOINTS = {
  sm: 639,
  md: 767,
  lg: 1023,
  xl: 1279,
  xxl: 1535,
} as const

export type BreakpointKey = keyof typeof BREAKPOINTS
