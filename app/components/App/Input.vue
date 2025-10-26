<script lang="ts" setup>
/* TODO:
 * 1. Атрибуты все, кроме класс вешаются на input
 *
 * Пример-помощь: https://github.com/nuxt/ui/blob/v4/src/runtime/components/Input.vue
 */
import type { InputHTMLAttributes } from 'vue'

interface Props {
  variant?: 'filled' | 'lined' // default lined
  icon?: IconProps['name'] // После создания AppIcon
  trailingIcon?: boolean // Иконка в конце; default false(значит в начале)
  rounded?: boolean // border-radius полугкруг; default false
  size?: '' // default md (в размерах дефолтное всегда и везде md)
  color?: '' // default transparent + error
  autocomplete?: InputHTMLAttributes['autocomplete']
  type: InputHTMLAttributes['type'] // И другие... свойственные input
  disabled?: boolean
  // пропс error замена на color: error
}

interface Emits {
  iconClick: []
  input: []
}

defineOptions({ inheritAttrs: false })

export type { Props as InputProps, Emits as InputEmits }
</script>

<template>
  <div
    сlass="input"
  >
    <AppIcon class="input__icon" />
    <input
      class="input__field"
      v-bind="$attrs"
    >
  </div>
</template>

<style lang="scss">
.input {
  $this: &;

  &__field {}
}
</style>
