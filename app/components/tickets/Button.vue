<script lang="ts" setup>
import AppDropdown from '~/components/App/Dropdown.vue'
import AppSheet from '~/components/App/Sheet.vue'
import type { ButtonProps } from '~/components/App/Button.vue'

interface Props {
  mode?: 'page' | 'dropdown' | 'sheet'
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

const onButtonClick = async () => {
  if (props.mode !== 'page') return
  await navigateTo('tickets')
}
</script>

<template>
  <Component
    :is="rootElement"
    class="tickets-button"
  >
    <AppButton
      :variant
      :color
      icon="message"
      @click="onButtonClick"
    />
    <template #content>
      <p> Тут будет что-то </p>
    </template>
  </Component>
</template>
