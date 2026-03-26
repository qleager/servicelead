<script lang="ts" setup>
import type { IconProps } from '../Icon.vue'
import type { SelectOptionProps } from './_Option.vue'

interface Props {
  color?: 'white' | 'neutral' | 'primary'
  /**
   * How to display selected items in multiple mode
   *
   * - `'number'` – AppTag with a counter
   * - `'list'`   – Scrollable list of AppTags with label and close button
   *
   * @defaultvalue `'number'`
   */
  counter?: 'number' | 'list'
  disabled?: boolean
  icon?: IconProps['name']
  items: Item[]
  multiple?: boolean
  placeholder?: string
  /**
   * Controls how the placeholder behaves when a value is selected
   *
   * - `'static'` – Always visible inside the input
   * - `'float'`  – Floats to the border when a value is selected
   * - `false`    – Visible inside the input, hidden when a value is selected
   *
   * @defaultvalue false
   */
  placeholderMode?: 'static' | 'float'
  /**
   * Show reset selected button
   *
   * @defaultvalue false
   */
  reset?: boolean
  /**
   * Apply 50% border radius
   *
   * @defaultvalue false
   */
  rounded?: boolean
  /**
   * Show search field in the dropdown
   *
   * @defaultvalue false
   */
  search?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg'
  variant?: 'solid' | 'outline' | 'nofilled'
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
  counter: typeof props.counter
  icon: typeof props.icon
  isCollapsed: typeof isCollapsed
  isSelected: typeof isSelected
  multiple: typeof props.multiple
  placeholder: typeof props.placeholder
  placeholderMode: typeof props.placeholderMode
  rounded: typeof props.rounded
  size: typeof props.size
  variant: typeof props.variant
}

// Type Guards
const isOptionObject = (option: Option | Value): option is Option => {
  return typeof option === 'object' && option !== null && 'value' in option
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'outline',
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

const countOfSelected = computed(() => (Array.isArray(model.value) ? model.value.length : 0))

const isSelected = computed(() => props.multiple ? !isEmpty(model.value) : !isNil(model.value))

const isModelElementVisible = computed(() => !props.multiple)

const isCounterVisible = computed(() => {
  return Array.isArray(model.value)
    && props.multiple
    && model.value.length
    && props.counter == 'number'
})

const isSelectedListVisible = computed(() => {
  return Array.isArray(model.value)
    && model.value.length
    && props.counter == 'list'
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
}

const resetAll = () => {
  model.value = undefined
}

provide<Injection>('selectState', {
  isSelected,
  isCollapsed,
  variant: props.variant,
  size: props.size,
  color: props.color,
  icon: props.icon,
  multiple: props.multiple,
  counter: props.counter,
  placeholder: props.placeholder,
  placeholderMode: props.placeholderMode,
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
    <AppDropdown
      v-model="isCollapsed"
    >
      <AppSelectField>
        <AppSelectPlaceholder />
        <div
          v-if="isModelElementVisible"
          class="select__model"
        >
          {{ model }}
        </div>
        <AppSelectCounter v-if="isCounterVisible">
          {{ countOfSelected }}
        </AppSelectCounter>
        <AppSelectSelectedList
          v-if="isSelectedListVisible"
          :items="(Array.isArray(model) ? model : [])"
          @close="onSelectedClose"
        />
      </AppSelectField>
      <template #content>
        <div class="select__slot select__slot-content">
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

          <div class="select__nodata-text">
            {{ nodataText }}
          </div>
          <AppButton
            v-if="reset"
            class="select__reset-button"
            color="lighter"
            size="sm"
            variant="link"
            @click="resetAll"
          >
            Очистить все
          </AppButton>
        </div>
      </template>
    </AppDropdown>
  </div>
</template>

<style lang="scss">
.select {
  $this: &;
  $disabled: $this + '-disabled';

  width: 250px;

  &#{$disabled} {
    pointer-events: none;
    filter: brightness(1.2);
  }

  &__slot {
    &-content {
      display: flex;
      flex-direction: column;
      gap: $space-1;
    }
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

    &:empty {
      display: none;
    }
  }

  .dropdown,
  .floater,
  /* stylelint-disable-next-line selector-class-pattern */
  .floater__slot-default {
    width: 100%;
  }

}
</style>
