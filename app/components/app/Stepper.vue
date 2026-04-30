<script lang="ts" setup>
import type { VNodeChild } from 'vue'

interface Props {
  /**
   * Allows changing the current step from the UI
   *
   * @defaultvalue `true`
   */
  actionable?: boolean
  /**
   * List of steps to display
   */
  items: Item[]
  /**
   * Layout direction of the stepper
   *
   * @defaultvalue `'vertical'`
   */
  orientation?: 'vertical'
}

/**
 * Current step
 */
type Model = Item['value']

interface Item {
  /**
   * Additional text shown below the step label
   */
  description?: string
  /**
   * Disables interaction for the step
   */
  disabled?: boolean
  /**
   * Text shown as the step title
   */
  label?: string
  /**
   * Slot name used to customize this step
   */
  slot?: string
  /**
   * Unique value used as the step model value
   */
  value?: string | number
}

interface Slots {
  [key: string]: (props: { item: Item, isCompleted: boolean, isCurrent: boolean }) => VNodeChild
  indicator: (props: { isCompleted: boolean, isCurrent: boolean }) => VNodeChild
}

const props = withDefaults(defineProps<Props>(), {
  actionable: true,
})

const model = defineModel<Model>()

const currentStepIndex = computed(() => {
  return props.items.findIndex((item, index) => (item.value ?? index) === model.value)
})

const onItemClick = (item: Item, index: number) => {
  if (props.actionable) {
    model.value = item.value ?? index
  }
}

const isCompleted = (index: number) => index < currentStepIndex.value

const isCurrent = (index: number) => index === currentStepIndex.value

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
            'stepper__item-completed': isCompleted(index),
            'stepper__item-current': isCurrent(index),
          },
        ]"
        @click="onItemClick(item, index)"
      >
        <div class="stepper__item-indicator">
          <slot name="indicator">
            <div class="stepper__item-indicator-dot">
              <slot name="indicator">
                {{ index + 1 }}
              </slot>
            </div>
          </slot>
          <div class="stepper__item-indicator-line" />
        </div>
        <div class="stepper__item-content">
          <slot
            :is-completed="isCompleted(index)"
            :is-current="isCurrent(index)"
            :item
            :name="item.slot"
          >
            <div
              v-if="item.label"
              class="stepper__item-label"
            >
              {{ item.label }}
            </div>
            <div
              v-if="item.description"
              class="stepper__item-description"
            >
              {{ item.description }}
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
    gap: $space-1;

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
        margin-top: $space-05;
        border-radius: $radius-10;

        @include text(regular, xs);

        color: white;

        background-color: $color-neutral-150;

        #{$completed} & {
          background-color: $color-primary;
        }

        #{$current} & {
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

        #{$this}:last-of-type & {
          min-height: unset;
        }
      }
    }

    &-label {
      @include text(semibold, sm);

      text-align: left;
    }

    &-description {
      @include text(regular, sm);

      text-align: left;
    }
  }
}
</style>
