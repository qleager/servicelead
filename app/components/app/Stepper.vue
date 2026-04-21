<script lang="ts" setup>
import type { VNodeChild } from 'vue'

interface Props {
  actionable?: boolean // def true -- значит, что при клике по точкам и item будет меняться шаг
  items: Item[]
  orientation?: 'vertical' // и ток он пока
}

type Model = Item['value']

interface Item {
  disabled?: boolean
  label?: string
  value?: string | number // для доступа к слоту
}

interface Slots {
  [key: `${string | number}-item`]: (props: { item: Item, isCompleted: boolean, isCurrent: boolean }) => VNodeChild
}

const props = withDefaults(defineProps<Props>(), {
  actionable: true,
})

const model = defineModel<Model>()

const currentStepIndex = computed(() => {
  // тут ищем Item.value иначе это будет как раз index
  return props.items.findIndex((item, index) => (item.value ?? index) === model.value)
})

const onItemClick = (item: Item, index: number) => {
  // чекнули item на наличе value, иначе ставим index

  model.value = item.value ?? index
}

export type { Props as StepperProps, Model as StepperModel, Slots as StepperSlots, Item as StepperItem }
</script>

<template>
  <div class="stepper">
    <template
      v-for="(item, index) in items"
      :key="index"
    >
      <button
        :class="[
          'stepper__item',
          {
            'stepper__item-completed': index < currentStepIndex,
            'stepper__item-current': index === currentStepIndex,
          },
        ]"
        @click="onItemClick(item, index)"
      >
        <!-- тут точка и линия -->
        <div class="stepper__item-counter">
          <div class="stepper__item-dot" />
          <div class="stepper__item-line" />
        </div>
        <div class="stepper__item-label">
          <slot
            v-if="index <= currentStepIndex"
            :is-completed="index < currentStepIndex"
            :is-current="currentStepIndex === index"
            :item
            :name="`${item.value ?? index}-item`"
          >
            <!-- хз, получится так :name или нет -->
            {{ item?.label ?? index }}
          </slot>
          <template v-else>
            {{ item.label }}
            {{ index }}
            {{ currentStepIndex }}
          </template>
        </div>
      </button>
    </template>
  </div>
</template>

<style lang="scss">
.stepper {
  display: flex;
  flex-direction: column;
  gap: $space-2;

  &__item {
    $this-item: &;
    $completed: $this-item + '-completed';
    $current: $this-item + '-current';

    display: flex;
    gap: $space-2;

    &:last-child {
      #{$this-item} {
        &-line {
          min-height: unset;
        }
      }
    }

    &-counter {
      display: flex;
      flex-direction: column;
      gap: $space-1;
      align-items: center;
      align-self: stretch;

      width: 16px;
      padding-inline: $space-3;
    }

    &-dot {
      width: 6px;
      height: 6px;
      margin: 5px;
      border-radius: $radius-10;

      background-color: $color-neutral-150;

      #{$completed} & {
        background-color: $color-primary;
      }

      #{$current} & {
        width: 16px;
        height: 16px;
        margin: 0;
        border: 5px solid $color-primary-200;

        background-color: $color-primary;
      }
    }

    &-line {
      flex: 1 1 auto;

      width: 4px;
      min-height: 15px;
      border-radius: $radius-1;

      background-color: $color-neutral-150;

      #{$completed} & {
        background-color: $color-primary;
      }

      #{$current} & {
        background-color: $color-primary-200;
      }
    }

    &-label {
      #{$this-item}:not(#{$current}):not(#{$completed}) & {
        color: $color-neutral-400;
      }
    }
  }
}
</style>
