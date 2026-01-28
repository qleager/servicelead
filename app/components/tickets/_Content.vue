<script lang="ts" setup>
import AppWidget from '~/components/app/Widget.vue'
import type { TicketsButtonProps } from './Button.vue'

interface Props {
  mode?: TicketsButtonProps['mode']
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'dropdown',
})

const rootElement = computed(() => {
  switch (props.mode) {
    case 'dropdown':
      return AppWidget
    case 'sheet':
      return 'div'
    default:
      return 'div'
  }
})

const classname = computed(() => [
  'tickets-button-content',
  `tickets-button-content-${props.mode}`,
])

export type { Props as TicketsButtonContentProps }
</script>

<template>
  <Component
    :is="rootElement"
    title="Тикеты"
    icon="message"
    :class="classname"
    class="tickets-button-content"
  >
    <div
      v-if="false"
      class="tickets-button-content__list"
    >
      <TicketsEntry
        v-for="i in 4"
        :key="i"
        minimal
      />
    </div>
    <div
      v-else
      class="tickets-button-content__empty"
    >
      <div class="tickets-button-content__empty-content">
        <NuxtImg
          class="tickets-button-content__empty-icon"
          src="/images/tickets/button__content-empty-icon.svg"
        />
        <div class="tickets-button-content__empty-text">
          <div>У вас еще нет ни одного тикета </div>
          <div>Хотите создать?</div>
        </div>
      </div>
    </div>
    <template #footer>
      <AppButton
        color="neutral"
        class="tickets-button-content__empty-button"
      >
        Создать тикет
      </AppButton>
    </template>
  </Component>
</template>

<style lang="scss">
.tickets-button-content {
$this: &;
$dropdown: $this + '-dropdown';

&#{$dropdown} {
  gap: $space-6;
  min-width: 321px;
  max-width: 321px;
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
