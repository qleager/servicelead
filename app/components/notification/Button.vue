<script lang="ts" setup>
import AppWidgetDropdown from '@components/app/WidgetDropdown.vue'
import AppSheet from '@components/app/Sheet.vue'
import type { ButtonProps } from '@components/app/Button.vue'

interface Props {
  color?: ButtonProps['color']
  mode?: 'dropdown' | 'sheet'
  notification?: unknown[]
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

export type { Props as NotificationButtonProps }
</script>

<template>
  <Component
    :is="rootElement"
    class="notification-button"
    icon="notice"
    title="Уведомления"
  >
    <AppButton
      :color
      icon="notice"
      :variant
    />

    <template #content>
      <div class="notification-button__content">
        <NotificationList />
      </div>
    </template>
  </Component>
</template>

<style lang="scss">
.notification-button {
  &__content {
    max-width: 320px;
    margin: -$space-2;
  }
}
</style>
