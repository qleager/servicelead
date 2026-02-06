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
   * Color of trigger button (AppButton)
   *
   * @defaultvalue `'primary'`
   */
  color?: ButtonProps['color']
  /**
   * Variant of trigger button (AppButton)
   *
   * @defaultvalue `'filled'`
   */
  variant?: ButtonProps['variant']
  // TODO: тикеты в сторе? или по клику грузим?
  tickets?: unknown[]
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'page',
  tickets: () => [] as unknown[],
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
    title="Тикеты"
    icon="message"
    class="tickets-button"
  >
    <AppButton
      :variant
      :color
      icon="message"
      @click="onButtonClick"
    />
    <template #content>
      <TicketsButtonContent
        :tickets
      />
    </template>
  </Component>
</template>
