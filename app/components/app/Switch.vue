<script lang="ts" setup>
import type { VNodeChild } from 'vue'
import type { Subset, Size, Color } from '~/types/ds'

interface Props {
  color?: Subset<Color, 'primary'>
  description?: string
  disabled?: boolean
  id?: string
  label?: string
  loading?: boolean
  name?: string
  required?: boolean
  size?: Subset<Size, 'md'>
  trailing?: boolean
  value?: string
}

type Model = boolean

interface Slots {
  description?: () => VNodeChild
  label?: () => VNodeChild
}

const props = withDefaults(defineProps<Props>(), {
  color: 'primary',
  size: 'md',
})

const slots = defineSlots<Slots>()

const model = defineModel<Model>({ default: false })

const classname = computed(() => [
  'switch',
  `switch-color-${props.color}`,
  `switch-size-${props.size}`,
  { 'switch-on': model.value },
  { 'switch-loading': props.loading },
  { 'switch-trailing': props.trailing },

])
export type { Props as SwitchProps, Model as SwitchModel, Slots as SwitchSlots }
</script>

<template>
  <input
    v-if="name"
    :checked="model"
    class="switch__input"
    hidden
    :name
    readonly
    type="checkbox"
    :value
  >
  <button
    :class="classname"
    :disabled="loading || disabled"
    @click="model = !model"
  >
    <div class="switch__control">
      <span class="switch__thumb">
        <AppIcon
          v-if="loading"
          name="load_32"
          :size="16"
        />
      </span>
    </div>
    <div class="switch__content">
      <div
        v-if="slots.label || props.label"
        class="switch__label"
      >
        <slot name="label">
          {{ label }}
        </slot>
        <span
          v-if="required"
          class="switch__required"
        > *</span>
      </div>
      <div
        v-if="slots.description || props.description"
        class="switch__description"
      >
        <slot name="description">
          {{ description }}
        </slot>
      </div>
    </div>
  </button>
</template>

<style lang="scss">
.switch {
  $this: &;
  $primary-color: & + '-color-primary';
  $size-md: & + '-size-md';
  $disabled: & + ':disabled';
  $loading: & + '-loading';
  $trailing: & + '-trailing';
  $on: & + '-on';

  display: flex;
  gap: $space-2;

  @include is($trailing) {
    flex-direction: row-reverse;
  }

  @include is($disabled) {
    cursor: not-allowed;
    filter: brightness(0.75);
  }

  @include is($loading) {
    cursor: not-allowed;
  }

  &__control {
    position: relative;
    background-color: $color-neutral-50;

    @include is($size-md) {
      width: 44px;
      height: 24px;
      padding: $space-05;
      border-radius: $radius-9;
    }

    @include is($on + $primary-color) {
      background-color: $color-primary;
    }
  }

  &__thumb {
    position: absolute;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: $radius-6;

    background-color: $color-neutral-300;

    transition: $active-duration-sm;

    @include is($on + $size-md) {
      left: 20px;
      width: 20px;
      height: 20px;
      background-color: white;
    }

    @include is($loading) {
      transform-origin: 50% 50%;
      animation: clockwiseRotate 1s linear infinite;
    }
  }

  &__content {
    text-align: left;

    @include is($size-md) {
      @include text(regular, sm);
    }

    @include is($trailing) {
      text-align: right;
    }

    @include is($loading) {
      color: $color-neutral-700;
    }
  }

  &__required {
    color: $color-red;
  }

  &__description {
    color: $color-neutral;

    @include is($size-md) {
      @include text(regular, xs);
    }
  }
}
</style>
