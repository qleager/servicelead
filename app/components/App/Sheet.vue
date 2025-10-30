<script lang="ts" setup>
interface Props {
  title?: string
  icon?: IconProps['name']
}
</script>

<template>
  <!-- Изучить лучше диалог или див обычный -->
  <!-- анимацию из animate.css
    утсановить пакет, добаувить в ds (есть пример в leadsale-client)
  -->
  <dialog class="sheet">
    <header class="sheet__header" />
    <div class="sheet__main">
      <slot />
    </div>
    <footer class="sheet__footer">
      <slot name="footer" />
    </footer>
  </dialog>
</template>
