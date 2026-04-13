<script lang="ts" setup>
import type { VNodeChild } from 'vue'

interface Props {
  actionable?: boolean // def true -- значит, что при клике по точкам и item будет меняться шаг
  items: Item[]
  orientation?: 'vertical' // и ток он пока
}

type Model = Item['value']

interface Item {
  disabled?: boolean
  label?: string
  disabled?: boolean
  value?: string | number // для доступа к слоту
}

interface Slots {
  [key: `${string | number}-item`]: (props: { item: Item, isCompleted: boolean, isCurrent: boolean }) => VNodeChild
}

const currentStepIndex = computed(() => тут ищем Item.value иначе это будет как раз index )

const onItemClick = (item: Item, index: number) => {
  чекнули item на наличе value, иначе ставим index

  model.value = 
}
</script>

<template>
  <div class="stepper">
    <template
      v-for="(item, index) in items"
      :key="index"
    >
      <button
        :class="[
          'stepper__item',
          { 'stepper__item-completed': index < currentStepIndex,
            'stepper__item-current': index === currentStepIndex }
        ]"
        @click="onItemClick(item, index)"
      >
        // тут точка и линия
        <slot
          :is-completed="index === currentStepIndex"
          :is-current=""
          :item
           :name="`${item.value ?? index}-item`" <!-- хз, получится так или нет -->
        >
          {{ item?.label ?? index }}
        </slot>
      </button>
    </template>
  </div>
</template>

<style lang="scss">
.stepper {
  &__item {
    $completed: 
    $current:

    &#{$completed} {

    }

    &#{$current} {

    }
  }
}
</style>
