import { defineNuxtPlugin } from '#app'
import { provideSSRWidth } from '@vueuse/core'
import { BREAKPOINTS } from '#shared/constants'

export default defineNuxtPlugin((nuxtApp) => {
  const device = useDevice()

  let ssrWidth: number = BREAKPOINTS.xl
  if (device.isMobile) ssrWidth = BREAKPOINTS.sm
  else if (device.isTablet) ssrWidth = BREAKPOINTS.lg

  provideSSRWidth(ssrWidth, nuxtApp.vueApp)
})
