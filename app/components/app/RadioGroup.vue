<script lang="ts" setup>
import type { Size, Subset } from '~/types/ds'
import type { IconProps } from './Icon.vue'

interface Props {
  disabled?: boolean
  indicator?: 'start' | 'end' | 'hidden' // def start
  items: Item[] | string[]
  size?: Subset<Size, 'sm' | 'md'>
  variant?: 'card' | 'pill' | 'list' // pill в дизе как tag
}

type Model = Item['value']

interface Slots {
  icon:
  label: props item
  description: props item
}

interface Item {
  description?: string
  disabled?: boolean
  icon: IconProps['name']
  label?: string
  value?: string
}

// нормалайзер
const items = computed(() => {
  return props.items.map((item) => {
    if (typeof item === 'string') {
      return { label, value } // и label и value = item
    }

    // никаких проверок, даже пустой объект пусть возвращает
    return item
  })
})
</script>

<template>
  <div>
    // каждый айтем обязательно кнопка
    // рядом input для submit совместимости 
    <button></button>
  </div>
  // в конце провести проверку на табулирование (табом выбирать айтем, энтером заселектить)
</template>

<style lang="scss">
// ширину и высоту не задавать
gap 8px пока

</style>
