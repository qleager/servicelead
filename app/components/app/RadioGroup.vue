<script lang="ts" setup>
import type { Size, Subset } from '~/types/ds'
import type { IconProps } from './Icon.vue'
import type { VNodeChild } from 'vue'

interface Props {
  disabled?: boolean
  indicator?: 'start' | 'end' | 'hidden'
  items: Item[] | string[]
  size?: Subset<Size, 'sm' | 'md'>
  variant?: 'card' | 'pill' | 'list'
}

type Model = Item['value']

interface Slots {
  description?: (props: { item: Item }) => VNodeChild
  icon?: (props: { item: Item }) => VNodeChild
  label?: (props: { item: Item }) => VNodeChild
}

interface Item {
  [key: string]: unknown
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
  { 'radio-group-disabled': props.disabled },
])

const items = computed(() => {
  return props.items.map((item) => {
    if (typeof item === 'string') {
      return { label: item, value: item }
    }

    return item
  })
})

const iconSize = computed(() => {
  switch (props.size) {
    case 'sm': {
      return 20
    }
    case 'md': {
      return 24
    }
    default: {
      const _exhaustiveCheck: never = props.size
      return _exhaustiveCheck
    }
  }
})

export type { Props as RadioGroupProps, Model as RadioGroupModel, Slots as RadioGroupSlots, Item as RadioGroupItem }
</script>

<template>
  <div :class="classname">
    <button
      v-for="(item, index) in items"
      :key="item.value ?? item.label ?? index"
      :class="[
        'radio-group__item',
        { 'radio-group__item-active': model === item.value },
      ]"
      :disabled
      @click="model = item.value"
    >
      <input
        v-model="model"
        class="radio-group__field"
        :disabled
        type="radio"
        :value="item.value"
        :id="item.value ?? item.label ?? String(index)"
      >
      <div class="radio-group__item-indicator" />
      <div class="radio-group__item-info">
        <template v-if="$slots.icon || item.icon">
          <slot
            :item
            name="icon"
          >
            <AppIcon
              v-if="item.icon"
              class="radio-group__item-icon"
              :name="item.icon"
              :size="iconSize"
            />
          </slot>
        </template>
        <div
          v-if="($slots.label || item.label) || ($slots.description || item.description)"
          class="radio-group__item-text"
        >
          <div
            v-if="$slots.label || item.label"
            class="radio-group__item-label"
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
            class="radio-group__item-description"
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
  </div>
</template>

<style lang="scss">
.radio-group {
  $this: &;
  $disabled: $this + '-disabled';

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
    $this-item: &;
    $item-hover: $this-item + ':hover';
    $item-active: $this-item + '-active';
    $item-disable: $this-item + '-disable';

    cursor: pointer;
    display: flex;
    flex: 1;
    gap: $space-2;

    @include is($disabled) {
      pointer-events: none;
    }

    @include is($indicator-start) {
      flex-direction: row;
    }

    @include is($indicator-end) {
      flex-direction: row-reverse;
      justify-content: space-between;
    }

    @include is($variant-card) {
      border: 1px solid $color-neutral-200;
      border-radius: $radius-4;

      &#{$item-active} {
        border: 1px solid $color-primary;
        background-color: $color-neutral-50;
      }

      &#{$item-hover} {
        background-color: $color-neutral-50;
      }

      @include is($disabled) {
        border: $color-neutral-200;
      }
    }

    @include is($variant-card + $size-md) {
      padding: $space-3;
    }

    @include is($variant-card + $size-sm) {
      padding: $space-2 $space-3;
    }

    @include is($variant-pill) {
      border: 1px solid $color-neutral-200;
      border-radius: $radius-8;

      &#{$item-active} {
        border: 1px solid $color-primary;
        background-color: $color-neutral-50;
      }

      &#{$item-hover} {
        background-color: $color-neutral-50;
      }

      @include is($disabled) {
        border: $color-neutral-200;
        background-color: transparent;
      }
    }

    @include is($variant-pill + $size-md) {
      padding: $space-3 $space-5 $space-3 $space-4;
    }

    @include is($variant-pill + $size-sm) {
      padding: $space-2 $space-3;
    }

    @include is($variant-list) {
      padding: 0;
      border: none;
    }

    &-info {
      display: flex;
      gap: $space-2;
    }

    &-label {
      text-align: start;

      @include is($size-md) {
        @include text(regular, md);
      }

      @include is($size-sm) {
        @include text(regular, sm);
      }
    }

    &-description {
      color: $color-neutral;
      text-align: start;

      @include is($size-md) {
        @include text(regular, sm);
      }

      @include is($size-sm) {
        @include text(regular, xs);
      }
    }

    &-indicator {
      display: flex;
      align-items: center;
      justify-content: center;

      width: 20px;
      height: 20px;
      border-radius: $radius-10;

      background-color: $color-primary-50;

      @include is($item-hover) {
        background-color: $color-primary-100;
      }

      @include is($item-active) {
        border: 3px solid $color-primary-100;
        background-color: $color-primary;
      }

      @include is($item-hover + $item-active) {
        border: 3px solid $color-primary-100;
        background-color: $color-primary;
      }

      @include is($indicator-hidden) {
        display: none;
      }

      @include is($disabled) {
        background-color: $color-neutral-100;
      }
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
}
</style>
