<script lang="ts" setup>
import { useLocalStorage } from '@vueuse/core'
import type { ThemeColorMode } from '~/types/ds'

const colorMode = useLocalStorage<ThemeColorMode>('theme-color-mode', 'light')

defineOptions({ inheritAttrs: false })

const isDark = computed({
  get: () => colorMode.value === 'dark',
  set: (value: boolean) => {
    colorMode.value = value ? 'dark' : 'light'
  },
})
</script>

<template>
  <ClientOnly>
    <AppSwitch
      v-model="isDark"
      v-bind="$attrs"
      description="Для теста"
      label="Темная тема"
    />
    <template #fallback>
      <AppSwitch
        class="color-mode-switch"
        v-bind="$attrs"
        description="Определяем..."
        label="Темная тема"
        loading
      />
    </template>
  </ClientOnly>
</template>
