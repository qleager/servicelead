<script lang="ts" setup>
interface Props {
  variant?: 'filled' | 'lined' | 'nofilled' // def filled
  color?: 'neutral' // def neutral; в макете видим тег с синеватым текстом каким то - это игнор, делаем просто черный
  icon?: IconProps['name']
  trailingIcon?: boolean // Иконкa в конце; default false (значит в начале)
  size?: '' // def md; всегда и везде, что то дефолтное это среднее)
}
</script>

<template>
  <span :class="classname">
    <span class="tag__slot">
      <slot />
    </span>
  </span>
</template>

<style lang="scss">
.tag {
  $this: &;
}
</style>
