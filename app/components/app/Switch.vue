<script lang="ts" setup>
import type { VNodeChild } from 'vue'
import type { Subset, Size, Color } from '~/types/ds'

// Ориентир nuxt ui -> USwitch

interface Props {
  color: Subset<Color, 'primary'>
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

const classname = computed(() => [
  'switch',
])
</script>

<template>
  <!-- оставть имеено кнопку, для доступности -->
  <button :class="classname">
    <!-- тут свитч -->
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
  $root: &;

  display: initial;

  &__description {
    @include text(regular, НА один размер меньше чем label);

    color: $color-neutral;
  }
}
</style>
