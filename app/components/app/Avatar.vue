<script lang="ts" setup>
import type { Size } from '~/types/ds'
import type { ChipProps } from './Chip.vue'
import type { IconProps } from './Icon.vue'

interface Props {
  alt: string // альтернативный текст
  chip: ChipProps // чип пропсы
  icon: IconProps['name']
  size: Size
  src: string // путь до изображения
}

// Todo:
// если нет scr -> показываем иконку -> альтернативный текст
// если есть проп chip, то обрачиваем в AppChip и байндим eму props.chip
</script>

<template>
  <div />
</template>

<style></style>
