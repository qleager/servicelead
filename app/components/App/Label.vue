<script lang="ts" setup>
/* TODO:
 * Компонент в который мы оборачиваеим элементы формы
 * через него в дальнейшем будет происходит и валидация
 */

interface Props {
  title?: string
  required?: boolean // def false
  caption?: string
  error?: string // если задан, красим поле в слоте, ошибку выводим в caption и тоже красим его в color-error
}
</script>

<template>
  <label :class="classname">
    <span
      v-if="title"
      class="label__title"
    >
      {{ title }}
    </span>
    <slot class="label__slot" />
  </label>
</template>

<style lang="scss">
.label {
  $this: &;
}
</style>
