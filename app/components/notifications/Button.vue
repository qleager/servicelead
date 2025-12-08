<script lang="ts" setup>
import AppDropdown from '~/components/App/Dropdown.vue'
import AppSheet from '~/components/App/Sheet.vue'
import type { ButtonProps } from '~/components/App/Button.vue'

interface Props {
  mode?: 'page' | 'dropdown' | 'sheet' // при клике вызов дропдауна или переход не страницу // def page
  color?: ButtonProps['color']
  variant?: ButtonProps['variant']
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'page',
})

const rootElement = computed(() => {
  switch (props.mode) {
    case 'dropdown':
      return AppDropdown
    case 'sheet':
      return AppSheet
    default:
      return 'div'
  }
})

const rootProps = computed(() => props.mode === 'dropdown' ? { mode: 'click' as const } : {})

const onButtonClick = async () => {
  if (props.mode !== 'page') return
  await navigateTo('notifications')
}
</script>

<template>
  <Component
    :is="rootElement"
    v-bind="rootProps"
    class="notifications-button"
  >
    <AppButton
      :variant
      :color
      icon="notice"
      @click="onButtonClick"
    />
    <template #content>
      <p> Тут будет что-то </p>
    </template>
  </Component>
</template>
