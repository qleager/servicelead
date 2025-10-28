<script lang="ts" setup>
/* TODO:
 * 1. size деволтный 16 или 24 – какой чаще встречвется в приле
 * 2. автосбор иконок в спрайт(если реализация укладывается в дедлайн)
 */

interface Props {
  name: string
  size?: number
}
</script>

<template>
  <svg
    class="icon"
    :width=""
    :height=""
  >
    <use :xlink:href="`/icons/sprite.svg#${name || 'favorite'}`" />
  </svg>
</template>

<style>

</style>
