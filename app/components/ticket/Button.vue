<script lang="ts" setup>
import AppWidgetDropdown from '~/components/app/WidgetDropdown.vue'
import AppSheet from '~/components/app/Sheet.vue'
import type { ButtonProps } from '~/components/app/Button.vue'

interface Props {
  /**
   * Color of trigger button (AppButton)
   *
   * @defaultvalue `'primary'`
   */
  color?: ButtonProps['color']
  /**
   * Mode of content visibility after clicking the button
   *
   * - `'dropdown'`     – show floater with active tickets
   * - `'sheet'`        – show AppSheet with active tickets
   *
   * @defaultvalue `'dropdown'`
   */
  mode?: 'dropdown' | 'sheet'
  /**
   * Variant of trigger button (AppButton)
   *
   * @defaultvalue `'solid'`
   */
  variant?: ButtonProps['variant']
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'dropdown',
})

const rootElement = computed(() => {
  switch (props.mode) {
    case 'dropdown':
      return AppWidgetDropdown
    case 'sheet':
      return AppSheet
    default:
      return 'div'
  }
})

export type { Props as TicketButtonProps }
</script>

<template>
  <Component
    :is="rootElement"
    class="ticket-button"
    icon="message"
    title="Тикеты"
  >
    <AppButton
      :color
      icon="message"
      :variant
    />

    <template #content>
      <div class="ticket-button__content">
        <TicketList />
      </div>
    </template>
  </Component>
</template>

<style lang="scss">
.ticket-button {
  &__content {
    width: 320px;
    margin: -$space-2;
  }
}
</style>
