/**
 * Если возникните проблема со smooth-scroll в web-app – рассмотреть position: fixed на #__nuxt
 */
<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import type { ThemeColorMode } from './types/ds'

const colorMode = useLocalStorage<ThemeColorMode>('theme-color-mode', 'light')

useHead({
  htmlAttrs: {
    'data-theme': computed(() => colorMode.value),
  },
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <AppOverlayProvider />
</template>
