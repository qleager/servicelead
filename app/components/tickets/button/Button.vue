<script lang="ts" setup>
import AppDropdown from '~/components/app/card/Dropdown.vue'
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
      return AppDropdown
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
    icon="message"
    title="Тикеты"
  >
    <AppButton
      :color
      icon="message"
      :variant
      @click="onButtonClick"
    />
    <template #header>
      <div class="tickets-button__header">
        <AppIcon
          class="tickets-button__header-icon"
          name="message"
        />
        <div>Тикеты</div>
      </div>
    </template>
    <template #content>
      <TicketsButtonContent
        class="tickets-button__content"
        :tickets
      />
    </template>
  </Component>
</template>

<style lang="scss">
.tickets-button {
  padding-block: $space-8;

  &__header {
    display: flex;
    gap: $space-2;
    align-items: center;
    padding-inline: $space-2;

    @include text(regular, xl);

    &-icon {
      color: $color-neutral
    }
  }
}
</style>
