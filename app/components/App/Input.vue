<script lang="ts" setup>
import type { InputHTMLAttributes } from 'vue'

interface Props {
  variant?: 'filled' | 'lined'
  icon?: IconProps['name']
  trailingIcon?: boolean
  rounded?: boolean
  size?: 'md' | 'sm'
  color?: 'transparent' | 'error'
  autocomplete?: InputHTMLAttributes['autocomplete']
  type: InputHTMLAttributes['type']
  disabled?: boolean
}
interface Emits {
  iconClick: []
  input: [string | number]
}
type Model = number | string

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<Props>(), {
  variant: 'lined',
  trailingIcon: false,
  rounded: false,
  size: 'md',
  color: 'transparent',
})

const emit = defineEmits<Emits>()
const model = defineModel<Model>({ default: '' })

const classname = computed(() => ([
  'input',
  `input-variant-${props.variant}`,
  `input-size-${props.size}`,
  `input-color-${props.color}`,
  { 'input-rounded': props.rounded },
  { 'input-hasIcon': !!props.icon },
  { 'input-trailingIcon': props.trailingIcon },
  { 'input-focused': isFocused.value },
  { 'input-filled': hasValue.value },
  { 'input-empty': !hasValue.value },
  { 'input-disabled': props.disabled },
]))

const isFocused = ref(false)

const normalizeNumber = (targetEl: HTMLInputElement) => {
  if (targetEl.type === 'number' && targetEl.value === '') return ''
  return targetEl.type === 'number' ? Number(targetEl.value) : targetEl.value
}

const hasValue = computed(() => {
  const value = model.value
  if (typeof value === 'number' || typeof value === 'bigint') return true
  return String(value ?? '').length > 0
})

const onInput = (e: Event) => {
  const targetEl = e.target as HTMLInputElement
  const value = normalizeNumber(targetEl)
  model.value = value as Model
  emit('input', value as string | number)
}

const onIconClick = (e: MouseEvent) => {
  e.preventDefault()
  e.stopPropagation()
  if (!props.disabled) emit('iconClick')
}
</script>

<template>
  <div
    :class="classname"
  >
    <button
      v-if="icon && !trailingIcon"
      type="button"
      class="input__icon input__icon--left"
      :disabled="disabled"
      aria-label="icon"
      @click="onIconClick"
    >
      <AppIcon
        class="input__icon"
        @click="emit('iconClick')"
      />
    </button>
    <input
      class="input__field"
      v-bind="$attrs"
      :value="model"
      :type
      :disabled
      :autocomplete
      @focus="isFocused = true"
      @blur="isFocused = false"
      @input="onInput"
    >
    <!-- Правая иконка -->
    <button
      v-if="icon && trailingIcon"
      type="button"
      class="input__icon input__icon--right"
      :disabled="disabled"
      aria-label="icon"
      @click="onIconClick"
    >
      <AppIcon
        class="input__icon"
        @click="emit('iconClick')"
      />
    </button>
  </div>
</template>

<style lang="scss">
.input {
  $this: &;
  $lined: $this + '-variant-lined';
  $filled: $this + '-variant-filled';
  $size-md: $this + '-size-md';
  $size-sm: $this + '-size-sm';
  $rounded: $this + '-rounded';
  $has-icon: $this + '-hasIcon:not(.input-trailingIcon)';
  $trailing-icon: $this + '-trailingIcon';
  $hover: $this + ':hover';
  $focus: $this + '-focused';
  $enter: $this + '-empty' + $focus;
  $writing: $focus;
  $state-filled: $this + '-filled' + ':not(' + $focus + ')';
  $disabled: $this + '-disabled';
  $error: $this + '-color-error';

  position: relative;
  display: inline-block;

  &#{$disabled} {
    pointer-events: none;
  }

  &__field {
    border-radius: $space-2;
    outline: none;

    @include text(regular, xs);

    &::placeholder {
      color: $color-neutral-light-500;
    }

    #{$rounded} & {
      border-radius: $space-20;
    }

    #{$size-md} & {
      width: 250px;
      height: 48px;
      padding: 12px $space-4;
    }
    #{$size-sm} & {
      width: 250px;
      height: 40px;
      padding:  $space-2 12px $space-2 $space-4;
    }

    #{$has-icon} & {
      padding-left: 56px;
    }
    #{$trailing-icon} & {
      padding-right: 56px;
    }

    #{$lined} {
      border: 1px solid $color-neutral-light-300;
      background: transparent;
    }
    #{$filled} & {
      border: none;
      background: $color-neutral-light-50;
    }

    #{$hover}#{$lined} & {
      border-color: $color-neutral-light-900;

      &::placeholder {
        color: $color-neutral-light-900;
      }
    }
    #{$enter}#{$lined} & {
      border-color: $color-neutral-light-300;

      &::placeholder {
        color: $color-neutral-light-400;
      }
    }
    #{$writing}#{$lined} &,
    #{$state-filled}#{$lined} & {
      border-color: $color-neutral-light-300;

      &::placeholder {
        color: $color-neutral-light-950;
      }
    }
    #{$disabled}#{$lined} & {
      border-color: $color-neutral-light-400;

      &::placeholder {
        color: $color-neutral-light-400;
      }
    }

    #{$hover}#{$filled} & {
      &::placeholder {
        color: $color-neutral-light-900;
      }
    }
    #{$enter}#{$filled} &,
    #{$disabled}#{$filled} & {
      &::placeholder {
        color: $color-neutral-light-400;
      }
    }
    #{$writing}#{$filled} &,
    #{$state-filled}#{$filled} {
      &::placeholder {
        color: $color-neutral-light-950;
      }
    }

    #{$error} & {
      border-color: $color-red-500;

      &::placeholder {
        color: $color-red-500;
      }
    }
  }

  &__icon {
    cursor: pointer;

    position: absolute;
    top: 0;
    bottom: 0;

    display: grid;
    place-items: center;

    width: 56px;
    padding: 0;
    border: 0;

    background: transparent;

    #{$has-icon} & {
      left: 0;
    }
    #{$trailing-icon} & {
      right: 0;
    }

    &:disabled {
      cursor: default;
      opacity: 0.5;
    }
  }

  &__svg {
    width: 24px;
    height: 24px;
  }
}
</style>
