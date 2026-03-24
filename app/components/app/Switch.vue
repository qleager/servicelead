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
  { 'switch-disabled': props.disabled },
  { 'switch-loading': props.loading },
  { 'switch-trailing': props.trailing },

])

const onClick = () => {
  if (props.loading || props.disabled) {
    return
  }
  else {
    model.value = !model.value
  }
}

export type { Props as SwitchProps, Model as SwitchModel, Slots as SwitchSlots }
</script>

<template>
  <button
    :class="classname"
    @click="onClick"
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
      <div class="switch__description">
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
  $disabled: & + '-disabled';
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

  @include is($primary-color) {
    --background-color: #{$color-primary};
  }

  &__control {
    display: flex;
    background-color: $color-neutral-50;
    transition: $active-duration-sm;

    @include is($size-md) {
      width: 44px;
      height: 24px;
      padding: $space-05;
      border-radius: $radius-9;
    }

    @include is($on) {
      justify-content: flex-end;
      background-color: var(--background-color);
    }
  }

  &__thumb {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 20px;
    height: 20px;
    border-radius: $radius-6;

    background-color: $color-neutral-300;

    @include is($on) {
      background-color: white;
    }

    @include is($loading) {
      transform-origin: 50% 50%;
      animation: clockwiseRotate 1s linear infinite;
    }
  }

  &__content {
    @include text(regular, sm);

    text-align: left;

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
    @include text(regular, xs);

    color: $color-neutral;
  }
}
</style>
