<script lang="ts" setup>
import AppDropdown from '~/components/app/Dropdown.vue'
import AppSheet from '~/components/app/Sheet.vue'
import type { ButtonProps } from '~/components/app/Button.vue'

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
              src="/images/tickets/parchment.svg"
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
    gap: 24px;

    min-width: 321px;
    max-width: 321px;
    padding: $space-8 $space-4;
    border-radius: $radius-6 !important;

    background: white;
    box-shadow: $shadow-md;
  }

  &__empty {
    display: flex;
    flex-direction: column;
    gap: 40px;
    align-items: center;

    width: 100%;

    &-content {
      display: flex;
      flex-direction: column;
      gap: 8px;
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
