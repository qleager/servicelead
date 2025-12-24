import { useBreakpoints as useBreakpointOriginal } from '@vueuse/core'
import { BREAKPOINTS } from '#shared/constants'
import type { UseBreakpointsReturn } from '@vueuse/core'
import type { BreakpointKey } from '#shared/constants'

export const useBreakpoints = (): UseBreakpointsReturn<BreakpointKey> => {
  return useBreakpointOriginal(BREAKPOINTS, {
    strategy: 'max-width', // Desktop-first
  })
}
