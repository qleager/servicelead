<script lang="ts" setup>
interface Props {
  color?: string // цвет чипа -> создать тип цветов(primary, blue, neutral, purple) из ds в app/types/ds/colors.ts -- def primary
  size?: string // можно тоже создать типы пока у нас sm / md / lg -- def md (sm-10px / md-12px / lg-14px)
  position?: string // top-left/botton-right/итд -- def top-right
  text?: string // тексту внутри чипа -- размер текста делаем на глаз
  inset?: boolean // чип внутри границы или на границе
  standalone?: boolean // уборать absolute с расположить его рядом с конетентов деф-слота
}
/* Пример реализации, что должно получиться и где использоваться:
 * https://ui.nuxt.com/docs/components/chip
 */
</script>

<template>
  <div>
    
  </div>
</template>

<style>

</style>