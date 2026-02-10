<script lang="ts" setup>
import AppCardDropdown from '~/components/app/card/Dropdown.vue'
import AppSheet from '~/components/app/Sheet.vue'
import type { ButtonProps } from '~/components/app/Button.vue'

interface Props {
  mode?: 'dropdown' | 'sheet'
  color?: ButtonProps['color']
  variant?: ButtonProps['variant']
  notifications?: unknown[]
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'dropdown',
  notifications: () => [] as unknown[],
})

const rootElement = computed(() => {
  switch (props.mode) {
    case 'dropdown':
      return AppCardDropdown
    case 'sheet':
      return AppSheet
    default:
      return 'div'
  }
})

export type { Props as NotificationsButtonProps }
</script>

<template>
  <Component
    :is="rootElement"
    class="notifications-button"
    icon="notice"
    title="Уведомления"
  >
    <AppButton
      :color
      icon="notice"
      :variant
    />
    <template #header>
      <div class="notifications-button__header">
        <AppIcon name="notice" />
        <div>Уведомления</div>
      </div>
    </template>
    <template #content>
      <NotificationsButtonContent
        :notifications
      />
    </template>
  </Component>
</template>

<style lang="scss">
.notifications-button {
  &__header {
    display: flex;
    gap: $space-2;
    align-items: center;
    padding-inline: $space-2;
  }
}
</style>
