<script lang="ts" setup>
import type { Size, Subset, Color } from '~/types/ds'
import type { IconProps } from '../Icon.vue'
import type { SelectOptionProps } from './_Option.vue'

interface Props {
  color?: Subset<Color, 'neutral' | 'primary'> | 'white'
  disabled?: boolean
  /**
   * Floats placeholder to the border when a value is selected
   *
   * @defaultvalue `false`
   */
  floatPlaceholder?: boolean
  icon?: IconProps['name']
  items: Item[]
  multiple?: boolean
  placeholder?: string
  /**
   * Show reset selected button
   *
   * @defaultvalue `false`
   */
  reset?: boolean
  /**
   * Apply 50% border radius
   *
   * @defaultvalue `false`
   */
  rounded?: boolean
  /**
   * Show search field in the dropdown
   *
   * @defaultvalue `false`
   */
  search?: boolean
  size?: Size
}

type Value = string | number
type Option = SelectOptionProps
type Item = Option | Value

type GetItemValue<T> = T extends { value: infer V } ? V : T
type GetModelValue<TItem, TMultiple extends boolean | undefined>
  = TMultiple extends true
    ? Array<GetItemValue<TItem>>
    : GetItemValue<TItem> | undefined

type Model = GetModelValue<Item, typeof props.multiple>
type MultipleModel = Array<GetItemValue<Item>>

interface Injection {
  color: typeof props.color
  floatPlaceholder: typeof props.floatPlaceholder
  icon: typeof props.icon
  isCollapsed: typeof isCollapsed
  isSelected: typeof isSelected
  multiple: typeof props.multiple
  placeholder: typeof props.placeholder
  rounded: typeof props.rounded
  size: typeof props.size
}

// Type Guards
const isOptionObject = (option: Option | Value): option is Option => {
  return typeof option === 'object' && option !== null && 'value' in option
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'lined',
  multiple: false,
  counter: 'number',
  placeholder: 'Выберите...',
  search: false,
  size: 'md',
  color: 'neutral',
  label: undefined,
})

const model = defineModel<Model>()

const isCollapsed = ref<boolean>(false)
const searchQuery = ref<string>('')

const classname = computed(() => [
  'select',
  `select-size-${props.size}`,
  { 'select-collapsed': isCollapsed.value },
  { 'select-disabled': props.disabled },
])

const options = computed(() => {
  // Normalize for single/multiple usecases
  const normalized = props.items.map((option) => {
    if (isOptionObject(option)) {
      return option
    }

    return { label: String(option), value: option }
  })

  // Return normilized & filtered
  if (searchQuery.value) {
    return search<Option>(normalized, searchQuery.value, { keys: ['label', 'value'] })
  }

  // Return normalized
  return normalized
})

const nodataText = computed(() => {
  if (searchQuery.value && !options.value.length) {
    return 'Нет совпадений'
  }

  if (!options.value.length) {
    return 'Нет данных'
  }

  return ''
})

const isSelected = computed(() => props.multiple ? !isEmpty(model.value) : !isNil(model.value))

const isModelElementVisible = computed(() => !props.multiple)

const isSelectedListVisible = computed(() => {
  return Array.isArray(model.value)
    && model.value.length
})

const isOptionSelected = (option: Option) => {
  // Multiple Mode
  if (props.multiple) {
    return Array.isArray(model.value)
      ? model.value.includes(option.value as GetItemValue<Item>)
      : false
  }

  // Single Mode
  return model.value === option.value
}

const onOptionClick = (option: Option) => {
  updateModel(option.value)
}

const onSelectedClose = (index: number) => {
  if (props.multiple && Array.isArray(model.value)) {
    updateModel(model.value[index] as Value)
  }
}

const updateModel = (value: Value) => {
  // Multiple Mode
  if (props.multiple) {
    const current = Array.isArray(model.value) ? model.value : []
    model.value = useXor(current as Value[], [value])
    return
  }

  // Single Mode
  model.value = value
  isCollapsed.value = false
}

const resetAll = () => {
  model.value = undefined
}

provide<Injection>('selectState', {
  isSelected,
  isCollapsed,
  size: props.size,
  color: props.color,
  icon: props.icon,
  multiple: props.multiple,
  placeholder: props.placeholder,
  floatPlaceholder: props.floatPlaceholder,
  rounded: props.rounded,
})

export type {
  Props as SelectProps,
  Model as SelectModel,
  MultipleModel as SelectMultipleModel,
  Value as SelectValue,
  Option as SelectOption,
  Injection as SelectInjection,
}
</script>

<template>
  <div :class="classname">
    <AppFloater
      v-model="isCollapsed"
      :allowed-placements="['top', 'bottom']"
      class="select__floater"
      width="min-reference"
    >
      <AppSelectField>
        <AppSelectPlaceholder />
        <div
          v-if="isModelElementVisible"
          class="select__model"
        >
          {{ model }}
        </div>
        <AppSelectSelectedList
          v-if="isSelectedListVisible"
          :items="(Array.isArray(model) ? model : [])"
          @close="onSelectedClose"
        />
      </AppSelectField>
      <template #content>
        <div class="select__content">
          <AppSelectSearch
            v-if="search"
            v-model="searchQuery"
          />
          <AppSelectOption
            v-for="option in options"
            :key="option.value"
            :checkbox="props.multiple"
            :is-selected="isOptionSelected(option)"
            :label="option.label"
            :value="option.value"
            @click="onOptionClick(option)"
          />

          <div
            v-if="nodataText"
            class="select__nodata-text"
          >
            {{ nodataText }}
          </div>
          <AppButton
            v-if="reset"
            class="select__reset-button"
            color="neutral"
            size="sm"
            variant="link"
            @click="resetAll"
          >
            Очистить все
          </AppButton>
        </div>
      </template>
    </AppFloater>
  </div>
</template>

<style lang="scss">
.select {
  $this: &;
  $disabled: $this + '-disabled';
  $size-xs: $this + '-size-xs';
  $size-sm: $this + '-size-sm';
  $size-md: $this + '-size-md';
  $size-lg: $this + '-size-lg';

  &#{$disabled} {
    pointer-events: none;
    filter: brightness(1.2);
  }

  &#{$size-xs} {
    @include text(regular, xs);
  }

  &#{$size-sm} {
    @include text(regular, sm);
  }

  &#{$size-md} {
    @include text(regular, md);
  }

  &#{$size-lg} {
    @include text(regular, md);
  }

  &__floater {
    width: 100%;
  }

  &__content {
    overflow: auto;

    height: 100%;
    padding: $space-4 $space-2;
    border-radius: $radius-2;

    background: white;
    box-shadow: $shadow-md;
  }

  &__reset-button {
    margin-left: auto;
    padding-inline: $space-2
  }

  &__nodata-text {
    @include text(regular, sm);

    padding-block: $space-3;
    color: $color-neutral-500;
    text-align: center;
  }

}
</style>
