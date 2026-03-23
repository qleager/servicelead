<script lang="ts" setup>
import type { VNodeChild } from 'vue'
import type { Subset, Size, Color } from '~/types/ds'

// Ориентир nuxt ui -> USwitch

interface Props {
  color?: Subset<Color, 'primary'>
  description?: string
  disabled?: boolean // диза нет, сделать filter обесцечивающий какой нибудь(не opacity) и pointer-event
  id?: string
  label?: string
  loading?: boolean // иконку внуть кружка, взять из кнопки иконку загрузки
  name?: string
  required?: boolean
  size?: Subset<Size, 'md'> // def md
  trailing?: boolean // реверт сетки, true = сначала label и caption, потом switcher
  value?: string
}

type Model = boolean

interface Slots {
  description: () => VNodeChild
  label: () => VNodeChild
}

const props = withDefaults(defineProps<Props>(), {
  color: 'primary',
  size: 'md',
})

defineSlots<Slots>()

const model = defineModel<Model>({ default: false })

const classname = computed(() => [
  'switch',
  `switch-color-${props.color}`,
  { 'switch-on': model.value },
  { 'switch-disabled': props.disabled },
  { 'switch-loading': props.loading },
  { 'switch-trailing': props.trailing },

])

export type { Props as SwitchProps, Model as SwitchModel, Slots as SwitchSlots }
</script>

<template>
  <button
    :class="classname"
    @click="model = !model"
  >
    <div class="switch__control">
      <span class="switch__thumb" />
    </div>
    <div class="switch__content">
      <slot name="label">
        {{ label }}
      </slot>
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
  $disabled: & + '-disabled';
  $loading: & + '-loading';
  $trailing: & + '-trailing';
  $on: & + '-on';

  display: flex;
  gap: $space-2;

  @include is($trailing) {
    flex-direction: row-reverse;
  }

  @include is($primary-color) {
    --background-color: #{$color-primary};
  }

  &__control {
    display: flex;

    width: 44px;
    height: 24px;
    padding: $space-05;
    border-radius: $radius-9;

    background-color: $color-neutral-50;

    transition: $active-duration-sm;

    @include is($on) {
      justify-content: flex-end;
      background-color: var(--background-color);
    }
  }

  &__thumb {
    display: block;

    width: 20px;
    height: 20px;
    border-radius: $radius-6;

    background-color: $color-neutral-300;

    @include is($on) {
      background-color: white;
    }
  }

  &__description {
    @include text(regular, НА один размер меньше чем label);

    color: $color-neutral;
  }
}
</style>
