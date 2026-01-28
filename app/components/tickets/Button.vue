<script lang="ts" setup>
import AppFloater from '~/components/app/Floater.vue'
import AppSheet from '~/components/app/Sheet.vue'
import type { ButtonProps } from '~/components/app/Button.vue'

interface Props {
  /**
   * Mode of content visibility after clicking the button
   *
   * - `'page'`         – route to page /tickets
   * - `'dropdown'`     – show floater with active tickets
   * - `'sheet'`        – show AppSheet with active tickets
   *
   * @defaultvalue `'page'`
   */
  mode?: 'page' | 'dropdown' | 'sheet'
  /**
   * Color of trigger AppButton
   */
  color?: ButtonProps['color']
  /**
   * Variant of trigger AppButton
   */
  variant?: ButtonProps['variant']
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'page',
})

const rootElement = computed(() => {
  switch (props.mode) {
    case 'dropdown':
      return AppFloater
    case 'sheet':
      return AppSheet
    default:
      return 'div'
  }
})

const onButtonClick = async () => {
  if (props.mode !== 'page') return
  await navigateTo('/tickets')
}

export type { Props as TicketsButtonProps }
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
      <TicketsContent :mode />
    </template>
  </Component>
</template>
