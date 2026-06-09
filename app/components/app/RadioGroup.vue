<!-- IDEA: Все таки просится разделить AppRadioGroup и AppRadio как Item
           раздельно реализован AppTabs, если сейчас осень'26 и более, реализация AppTabs обкатана, и показала себя хорошо – тут можно(нужно) сделать так же
-->
<script lang="ts">
import type { Size, Subset } from '~/types/ds'
import type { IconProps } from './Icon.vue'
import type { VNodeChild } from 'vue'

export interface RadioGroupProps<TItem> {
  disabled?: boolean
  error?: boolean
  indicator?: 'start' | 'end' | 'hidden'
  items: TItem[]
  name?: string
  size?: Subset<Size, 'sm' | 'md'>
  variant?: 'card' | 'pill' | 'list'
}

export interface RadioGroupEmits {
  change: [event: Event]
}

export type RadioGroupModel = RadioGroupItem['value']

export interface RadioGroupSlots<TItem> {
  description?: (props: { item: TItem }) => VNodeChild
  icon?: (props: { item: TItem }) => VNodeChild
  item?: (props: { item: TItem }) => VNodeChild
  label?: (props: { item: TItem }) => VNodeChild
}

export interface RadioGroupBaseItem {
  description?: string
  disabled?: boolean
  icon?: IconProps['name']
  label?: string
  value?: string
}

export type RadioGroupItem<
  TExtra extends object = object,
> = RadioGroupBaseItem & TExtra
</script>

<script lang="ts" setup generic="TItem extends RadioGroupItem = RadioGroupItem">
const props = withDefaults(defineProps<RadioGroupProps<TItem>>(), {
  indicator: 'start',
  size: 'md',
  variant: 'card',
})

const emit = defineEmits<RadioGroupEmits>()

const model = defineModel<RadioGroupModel>()

defineSlots<RadioGroupSlots<TItem>>()

const { error, name, emitFormChange } = useFormField(props)

const classname = computed(() => [
  'radio-group',
  `radio-group-variant-${props.variant}`,
  `radio-group-size-${props.size}`,
  `radio-group-indicator-${props.indicator}`,
  {
    'radio-group-disabled': props.disabled,
    'radio-group-error': error.value,
  },
])

const onChange = (event: Event) => {
  emitFormChange()
  emit('change', event)
}

const onClick = (event: MouseEvent) => {
  const button = event.currentTarget as HTMLButtonElement

  model.value = button.value
}
</script>

<template>
  <fieldset :class="classname">
    <button
      v-for="(item, index) in items"
      :key="item.value ?? item.label ?? index"
      :class="[
        'radio-group__item',
        { 'radio-group__item-active': model === item.value },
      ]"
      :disabled="item.disabled"
      role="radio"
      :value="item.value"
      @click.capture="onClick"
    >
      <slot
        :item
        name="item"
      >
        <div class="radio-group__item-indicator" />
        <div class="radio-group__item-info">
          <slot
            :item
            name="icon"
          >
            <AppIcon
              v-if="item.icon"
              class="radio-group__item-icon"
              :name="item.icon"
            />
          </slot>
          <div
            class="radio-group__item-main"
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
      </slot>
    </button>

    <input
      v-model="model"
      :disabled
      :name
      type="hidden"
      @change="onChange"
    >
  </fieldset>
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

  ///
  $error: $this + '-error';

  display: flex;
  gap: $space-2;

  margin: 0;
  padding: 0;
  border: unset;

  &__item {
    $this: &;
    $item-hover: $this + ':hover';
    $item-active: $this + '-active';
    $item-disabled: $this + '-disabled';

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
        background-color: $color-primary-50;
      }

      &#{$item-hover} {
        background-color: $color-primary-50;
        transition: $hover-duration-sm;
      }

      @include is($disabled) {
        border: $color-neutral-200;
      }
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
        transition: $hover-duration-sm;
      }

      @include is($disabled) {
        border: $color-neutral-200;
        background-color: transparent;
      }
    }

    @include is($variant-list) {
      padding: 0;
      border: none;
    }

    @include is($variant-card + $size-md) {
      padding: $space-3;
    }

    @include is($variant-card + $size-sm) {
      padding: $space-2 $space-3;
    }

    @include is($variant-pill + $size-md) {
      padding: $space-3 $space-5 $space-3 $space-4;
    }

    @include is($variant-pill + $size-sm) {
      padding: $space-2 $space-3;
    }

    @include is($error) {
      border-color: $color-error;
    }

    &-icon {
      @include is($size-sm) {
        width: 20px;
        height: 20px;
      }

      @include is($size-md) {
        width: 24px;
        height: 24px;
      }
    }

    &-info {
      display: flex;
      gap: $space-2;
    }

    &-main {
      display: flex;
      flex-direction: column;
      gap: $space-05;
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

      min-width: 20px;
      height: 20px;
      border: 3px solid $color-primary-50;
      border-radius: $radius-10;

      background-color: $color-primary-50;

      @include is($item-hover) {
        border-color: $color-primary-100;
        background-color: $color-primary-100;
        transition: $hover-duration-sm;
      }

      @include is($item-active) {
        border: 3px solid $color-primary-100;
        background-color: $color-primary;
        transition: $active-duration-sm;
      }

      @include is($indicator-hidden) {
        display: none;
      }

      @include is($disabled) {
        background-color: $color-neutral-100;
      }

      @include is($item-hover + $item-active) {
        border: 3px solid $color-primary-100;
        background-color: $color-primary;
      }

      @include is($error) {
        border-color: $color-red-50;
        background-color: $color-red-50;
      }
    }
  }
}
</style>
