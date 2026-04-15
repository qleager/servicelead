<script lang="ts" setup>
import type { Size, Subset } from '~/types/ds'
import type { IconProps } from './Icon.vue'
import type { VNodeChild } from 'vue'

interface Props {
  disabled?: boolean
  indicator?: 'start' | 'end' | 'hidden'
  items: Item[] | string[]
  size?: Subset<Size, 'sm' | 'md'>
  variant?: 'card' | 'pill' | 'list' // pill в дизе как tag
}

type Model = Item['value']

interface Slots {
  description?: (props: { item: Item }) => VNodeChild
  icon?: (props: { item: Item }) => VNodeChild
  label?: (props: { item: Item }) => VNodeChild
}

interface Item extends Record<string, any> {
  description?: string
  disabled?: boolean
  icon?: IconProps['name']
  label?: string
  value?: string
}

const props = withDefaults(defineProps<Props>(), {
  indicator: 'start',
  size: 'md',
  variant: 'card',
})

const model = defineModel<Model>()

defineSlots<Slots>()

const classname = computed(() => [
  'radio-group',
  `radio-group-variant-${props.variant}`,
  `radio-group-size-${props.size}`,
  `radio-group-indicator-${props.indicator}`,
])

// нормалайзер
const items = computed(() => {
  return props.items.map((item) => {
    if (typeof item === 'string') {
      return { label: item, value: item } // и label и value = item
    }

    // никаких проверок, даже пустой объект пусть возвращает
    return item
  })
})
</script>

<template>
  <div
    v-for="(item, index) in items"
    :key="item.value ?? item.label ?? index"
    :class="classname"
  >
    <!-- // каждый айтем обязательно кнопка -->
    <!-- // рядом input для submit совместимости  -->
    <button
      class="radio-group__item"
      :class="[
        'radio-group__item',
        { 'stepper__item-active': model === item.value },
      ]"
      @click="model = item.value"
    >
      <div class="radio-group__indicator">
        <!--
        Вариант
        <div
          v-if="model === item.value"
          class="radio-group__indicator-fill"
        /> -->
      </div>
      <div class="radio-group__info">
        <template v-if="$slots.icon || item.icon">
          <slot
            :item
            name="icon"
          >
            <AppIcon
              v-if="item.icon"
              class="radio-group__icon"
              :name="item.icon"
            />
          </slot>
        </template>
        <div class="radio-group__text">
          <div
            v-if="$slots.label || item.label"
            class="radio-group__text-label"
          >
            <slot
              :item
              name="label"
            >
              {{ item.label }}
            </slot>
          </div>
          <div
            v-if="$slots.description || item.description"
            class="radio-group__text-description"
          >
            <slot
              :item
              name="description"
            >
              {{ item.description }}
            </slot>
          </div>
        </div>
      </div>
    </button>
    <input
      v-model="model"
      class="radio-group__field"
      type="radio"
      :value="item.value"
      :id="item.value ?? item.label ?? String(index)"
    >
  </div>
  // в конце провести проверку на табулирование (табом выбирать айтем, энтером заселектить)
</template>

<style lang="scss">
// ширину и высоту не задавать
// gap 8px пока
.radio-group {
  $this: &;

  ///
  $size-sm: $this + '-size-sm';
  $size-md: $this + '-size-md';

  ///
  $variant-card: $this + '-variant-card';
  $variant-pill: $this + '-variant-pill';
  $variant-list: $this + '-variant-list';

  ///
  $indicator-start: $this + '-indicator-start';
  $indicator-hidden: $this + '-indicator-hidden';
  $indicator-end: $this + '-indicator-end';

  display: flex;
  gap: $space-2;

  &__item {
    $this: &;

    // внутренние переменные не получится через include is
    $active: $this + '-active';

    display: flex;
    gap: $space-2;

    @include is($indicator-start) {
      flex-direction: row;
    }

    @include is($indicator-end) {
      flex-direction: row-reverse;
    }
  }

  &__field {
    position: absolute;

    overflow: hidden;

    width: 1px;
    height: 1px;

    white-space: nowrap;

    clip-path: inset(50%);
  }

  &__indicator {
    width: 20px;
    height: 20px;
    border: 3px solid $color-primary-50;
    border-radius: $radius-10;

    background-color: $color-primary-50;

    @include is($active) {
      background-color: $color-primary;
    }

    @include is($indicator-hidden) {
      display: none;
    }
  }
}
</style>
