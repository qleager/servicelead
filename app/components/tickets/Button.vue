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
      <AppWidget
        title="Тикеты"
        icon="message"
        class="tickets-button__widget"
      >
        <div
          v-if="false"
          class="tickets-button__list"
        >
          <TicketsEntry
            v-for="i in 4"
            :key="i"
            minimal
          />
        </div>
        <div
          v-else
          class="tickets-button__empty"
        >
          <div class="tickets-button__empty-content">
            <NuxtImg
              class="tickets-button__empty-icon"
              src="/images/tickets/button__empty-icon.svg"
            />
            <div class="tickets-button__empty-text">
              <div>У вас еще нет ни одного тикета </div>
              <div>Хотите создать?</div>
            </div>
          </div>
          <AppButton
            color="neutral"
            class="tickets-button__empty-button"
          >
            Создать тикет
          </AppButton>
        </div>
      </AppWidget>
    </template>
  </Component>
</template>

<style lang="scss">
.tickets-button {
  &__widget {
    gap: $space-6;

    min-width: 321px;
    max-width: 321px;
    padding: $space-8 $space-4;
    border-radius: $radius-6 !important;

    box-shadow: $shadow-md;
  }

  &__empty {
    display: flex;
    flex-direction: column;
    gap: $space-10;
    align-items: center;

    width: 100%;

    &-content {
      display: flex;
      flex-direction: column;
      gap: $space-2;
      align-items: center;
    }

    &-icon {
      width: 124px;
      height: 124px;
      color: $color-neutral-400;
    }

    &-text {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    &-button {
      justify-content: center;
      width: 100%;
    }
  }
}
</style>
