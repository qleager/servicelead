import { useBreakpoints as useBreakpointVueUse } from '@vueuse/core'
import { BREAKPOINTS, type BreakpointKey } from '#shared/constants'

interface Return {
  /**
   * The size of screen
   *
   * - `'xs'`  – 0-639px;
   * - `'sm'`  – 640-767px
   * - `'md'`  – 768-1023px
   * - `'lg'`  – 1024-1279px
   * - `'xl'`  – 1280-1535px
   * - `'2xl'` – 1536-9999px
   */
  current: ComputedRef<BreakpointKey>
  /** The screen width is 0-639px */
  isXs: ComputedRef<boolean>
  /** The screen width is 640-767px */
  isSm: ComputedRef<boolean>
  /** The screen width is 768-1023px */
  isMd: ComputedRef<boolean>
  /** The screen width is 1024-1279px */
  isLg: ComputedRef<boolean>
  /** The screen width is 1280-1535px */
  isXl: ComputedRef<boolean>
  /** The screen width is 1536-9999px */
  is2xl: ComputedRef<boolean>
  /** The screen width is 0-767px */
  isSmAndSmaller: ComputedRef<boolean>
  /** The screen width is 0-1023px */
  isMdAndSmaller: ComputedRef<boolean>
  /** The screen width is 0-1279px */
  isLgAndSmaller: ComputedRef<boolean>
  /** The screen width is 0-1535px */
  isXlAndSmaller: ComputedRef<boolean>
  /** The screen width is 640-9999px */
  isSmAndGreater: ComputedRef<boolean>
  /** The screen width is 768-9999px */
  isMdAndGreater: ComputedRef<boolean>
  /** The screen width is 1024-9999px */
  isLgAndGreater: ComputedRef<boolean>
  /** The screen width is 1280-9999px */
  isXlAndGreater: ComputedRef<boolean>
}

export const useBreakpoints = (): Return => {
  const breakpoints = useBreakpointVueUse(BREAKPOINTS, {
    strategy: 'max-width',
    ssrWidth: 1024,
  })

  const current = breakpoints.active() as ComputedRef<BreakpointKey>

  const isXs = breakpoints.smaller('xs')
  const isSm = breakpoints.between('xs', 'sm')
  const isMd = breakpoints.between('sm', 'md')
  const isLg = breakpoints.between('md', 'lg')
  const isXl = breakpoints.between('lg', 'xl')
  const is2xl = breakpoints.greater('xl')

  const isSmAndSmaller = breakpoints.smallerOrEqual('sm')
  const isMdAndSmaller = breakpoints.smallerOrEqual('md')
  const isLgAndSmaller = breakpoints.smallerOrEqual('lg')
  const isXlAndSmaller = breakpoints.smallerOrEqual('xl')

  const isSmAndGreater = breakpoints.greater('xs')
  const isMdAndGreater = breakpoints.greater('sm')
  const isLgAndGreater = breakpoints.greater('md')
  const isXlAndGreater = breakpoints.greater('lg')

  return {
    current,
    isXs,
    isSm,
    isMd,
    isLg,
    isXl,
    is2xl,
    isSmAndSmaller,
    isMdAndSmaller,
    isLgAndSmaller,
    isXlAndSmaller,
    isSmAndGreater,
    isMdAndGreater,
    isLgAndGreater,
    isXlAndGreater,
  }
}

export type { Return as UseBreakpointsReturn }
