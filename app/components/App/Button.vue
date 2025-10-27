<script lang="ts" setup>
interface Props {
  variant?: 'filled' | 'lined' | 'nofiled' // default filled
  icon?: IconProps['name'] // После создания AppIcon
  size?: '' // default md (в размерах дефолтное всегда и везде md)
  color?: '' // default primary
  type?: 'button' | 'submit' | 'reset' // def button
  to?: string // навигация - когда нибудь сделаем типы из router, чтобы тут затипизированы были только реальные роуты (сделать пометку TODO)
  value?: string | number
  trailingIcon?: boolean // Иконак в конце default false (значит в начале)
  disabled?: boolean
  active?: boolean // вешаем стили будто бы она :active (будет нужно в табах)
  loading?: boolean // если да = AppIcon name="какая то иконка загрузчик"
}

export type { Props as ButtonProps }
</script>

<template>
  <button class="button">
    <AppIcon class="button__icon" />
    <span class="button__slot">
      <slot />
    </span>
  </button>
</template>

<style lang="scss">
.button {
  $this: &;
  $variant-filled: $this + '-variant-filled';
  // ...
}
</style>
