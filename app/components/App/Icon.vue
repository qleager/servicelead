<script lang="ts" setup>
/* TODO:
 * 1. size деволтный 16 или 24 – какой чаще встречвется в приле
 * 2. автосбор иконок в спрайт(если реализация укладывается в дедлайн)
 */

interface Props {
  name: string
  size?: number
}

withDefaults(defineProps<Props>(), {
  size: 24,
})

export type { Props as IconProps }
</script>

<template>
  <svg
    class="icon"
    :width="size"
    :height="size"
  >
    <use :xlink:href="`/icons/sprite.svg#${name || 'favorite'}`" />
  </svg>
</template>

<style lang="scss">
.icon {
  outline: 1px dashed rgb($color-warning, 80%);
  outline-offset: -2px;
}
</style>
