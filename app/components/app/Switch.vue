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
          class="switch__loading"
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

  cursor: pointer;
  display: flex;
  gap: $space-2;

  @include is($trailing) {
    flex-direction: row-reverse;
  }

  @include is($loading) {
    cursor: progress;
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

    @include is($on + $disabled + $primary-color) {
      background-color: $color-primary-300;
    }
  }

  &__thumb {
    position: absolute;
    left: 2px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: $radius-6;

    background-color: $color-neutral-300;

    transition: $blur-duration-sm linear;

    @include is($disabled) {
      background-color: $color-neutral-100;
    }

    @include is($on + $disabled) {
      background-color: $color-neutral-50;
    }

    @include is($on) {
      background-color: white;
      transition: $hover-duration-sm;
    }

    @include is($size-md) {
      width: 20px;
      height: 20px;
    }

    @include is($on + $size-md) {
      left: 22px;
    }
  }

  &__content {
    text-align: left;

    @include is($trailing) {
      text-align: right;
    }
  }

  &__required {
    color: $color-red;
  }

  &__loading {
    width: 60%;
    color: $color-neutral-800;
    animation: clockwiseRotate 1s linear infinite;
  }

  &__label {
    color: inherit;

    @include is($size-md) {
      @include text(regular, sm);
    }

    @include is($disabled) {
      color: $color-neutral-400;
    }
  }

  &__description {
    color: $color-neutral;

    @include is($size-md) {
      @include text(regular, xs);
    }

    @include is($disabled) {
      color: $color-neutral-300;
    }
  }
}
</style>
