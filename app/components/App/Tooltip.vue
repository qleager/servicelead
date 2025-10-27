<script lang="ts" setup>
/*
 * TODO: Компоент Подсказки
 * Используем для его работа AppFloater c mode: hover
 */
interface Props {
  text: string // текст в подсказке
}

export type { Props as TooltipProps }
</script>

<template>
  <!-- Подумать как тут правильно все обернуть, какие могут возникнуть ошибки -->
  <span :class="classname">
    <AppFloater>
      <!-- тут слот в слоте будет вот – помешает это или нет, надо понять -->
      <div class="tooltip__slot tooltip__slot-default">
        <slot />
        <!-- здесь показываем иконку info, если слот не задан -->
      </div>
      <template #content>
        <div class="tooltip__content">{{ $text }}</div>
      </template>
    </AppFloater>
  </span>
</template>

<style lang="scss">
.tooltip {
  $this: &;
}
</style>
