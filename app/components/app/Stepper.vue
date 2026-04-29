<script lang="ts" setup>
import type { VNodeChild } from 'vue'

interface Props {
  actionable?: boolean
  items: Item[]
  orientation?: 'vertical'
}

type Model = Item['value']

interface Item {
  description?: string
  disabled?: boolean
  label?: string
  slot?: string
  value?: string | number
}

interface Slots {
  [key: string]: (props: { item: Item, isCompleted: boolean, isCurrent: boolean, slot: string }) => VNodeChild
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
  if (props.actionable) {
    model.value = item.value ?? index
  }
}

export type { Props as StepperProps, Model as StepperModel, Slots as StepperSlots, Item as StepperItem }
</script>

<template>
  <div
    class="stepper"
  >
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
        <div class="stepper__item-indicator">
          <div class="stepper__item-indicator-dot">
            <slot name="indicator">
              {{ index + 1 }}
            </slot>
          </div>
          <div class="stepper__item-indicator-line" />
        </div>
        <div class="stepper__item-content">
          <slot
            :is-completed="index < currentStepIndex"
            :is-current="currentStepIndex === index"
            :item
            :name="item.slot ?? `${item.value ?? index}-item`"
          >
            <div class="stepper__item-label">
              <template v-if="item.label">
                {{ item.label }}
              </template>
            </div>
            <div class="stepper__item-description">
              <template v-if="item.label">
                {{ item.description }}
              </template>
            </div>
          </slot>
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
    $this: &;
    $completed: $this + '-completed';
    $current: $this + '-current';

    display: flex;
    gap: $space-2;

    &-indicator {
      display: flex;
      flex-direction: column;
      gap: $space-1;
      align-items: center;
      align-self: stretch;

      width: 16px;
      padding-inline: $space-3;

      &-dot {
        display: flex;
        align-items: center;
        justify-content: center;

        width: 16px;
        height: 16px;
        margin-top: 4px;
        border-radius: $radius-10;

        @include text(regular, xs);

        color: white;

        background-color: $color-primary;
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

        #{$this}:last-of-type & {
          min-height: unset;

          // или..
          // display: none;
          // иначе -line у последнего никогда не будет completed
        }
      }
    }

    &-label {
      @include text(semibold, sm);

      text-align: left;

      #{$this}:not(#{$current}):not(#{$completed}) & {
        color: $color-neutral-400;
      }
    }

    &-description {
      @include text(regular, sm);

      text-align: left;

      #{$this}:not(#{$current}):not(#{$completed}) & {
        color: $color-neutral-400;
      }
    }
  }
}
</style>
