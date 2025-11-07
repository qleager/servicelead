<script lang="ts" setup>
import type { IconProps } from '~/components/app/Icon.vue'
import type { InputHTMLAttributes } from 'vue'

interface Props {
  variant?: 'filled' | 'lined'
  icon?: IconProps['name']
  trailingIcon?: boolean
  rounded?: boolean
  size?: 'md' | 'sm'
  color?: 'darker' | 'lighter'
  autocomplete?: InputHTMLAttributes['autocomplete']
  type?: InputHTMLAttributes['type']
  name?: InputHTMLAttributes['name']
  disabled?: InputHTMLAttributes['disabled']
  placeholder?: InputHTMLAttributes['placeholder']
  reset?: boolean
  error?: boolean
}

interface Emits {
  reset: []
  input: []
}

type Model = null | string | number

const props = withDefaults(defineProps<Props>(), {
  variant: 'lined',
  size: 'md',
  placeholder: 'Введите...',
  color: 'darker',
})

defineOptions({ inheritAttrs: false })

const emits = defineEmits<Emits>()

const model = defineModel<Model>()

const classname = computed(() => ([
  'input',
  `input-size-${props.size}`,
  `input-variant-${props.variant}`,
  `input-color-${props.color}`,
  {
    'input-icon': props.icon,
    'input-icon-trailing': props.trailingIcon,
    'input-rounded': props.rounded,
    'input-error': props.error,
  },
]))

const isResetVisible = computed(() => model.value && String(model.value) && props.reset)
// Hide the icon when reset button is visible and icon is trailing
const isIconVisible = computed(() => !(props.trailingIcon && isResetVisible.value))

const onReset = () => {
  model.value = null
  emits('reset')
}

export type { Props as InputProps, Emits as InputEmits, Model as InputModel }
</script>

<template>
  <div
    :class="classname"
  >
    <AppIcon
      v-if="isIconVisible && icon"
      :name="icon"
      class="input__icon"
    />
    <input
      v-model="model"
      class="input__field"
      v-bind="$attrs"
      :placeholder
    >
    <button
      v-if="isResetVisible"
      class="input__reset"
    >
      <AppIcon
        name="close"
        class="input__reset-icon"
        @click="onReset"
      />
    </button>
  </div>
</template>

<style lang="scss">
@use 'sass:color';

.input {
  // Состояния комопонента
  $this: &;
  $variant-lined: $this + '-variant-lined';
  $variant-filled: $this + '-variant-filled';
  $color-lighter: $this + '-color-lighter';
  $color-darker: $this + '-color-darker';
  $error: $this + '-error';
  $rounded: $this + '-rounded';
  $size-md: $this + '-size-md';
  $size-sm: $this + '-size-sm';
  $icon: $this + '-icon';
  $trailing-icon: $this + '-icon-trailing';

  // Стили блока
  position: relative;
  z-index: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  width: fit-content;
  min-width: 250px;
  height: 48px;

  /*
   * Состояние компонент – его пропсы и model
   * Блок – главный элемент в верстке (.input)
   * Элемент - элементы верстки внутри блока (.input__field)
   *
   * Все, что состояния компонета хуярим как интерполяцию (#{$icon})
   * Так мы понимаем, где состояние, а где БЭМ (верстка)
   *
   * ⚠️ Модификатор !== состояние компонента
   */

  // Стили блока при состоянии компонента trailing-icon
  &#{$trailing-icon} {
    justify-content: flex-end;
  }

  // Стили блока при состоянии компонента
  &#{$size-sm} {
    height: 40px;
  }

  // Стили блока при состоянии компонента
  &#{$size-md} {
    height: 48px;
  }

  // Стили элемента блока
  &__icon {
    pointer-events: none;
    margin-inline: $space-4 0;

    // Стиль элемента блока при состоянии компонента $trailing-icon
    #{$trailing-icon} & {
      order: 1;
      margin-inline: 0 $space-3;
    }
  }

  // Стиль элемента блока
  &__field {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0 $space-4;
    border: 1px solid transparent;
    border-radius: $radius-2;

    background-color: transparent;

    @include text(regular, sm);

    // Стиль элемента блока при состоянии компонента $variant-lined
    #{$variant-lined} & {
      border: 1px solid $color-neutral-light-300;
      background: none !important;

      &:focus {
        border-color: $color-neutral-light-900;
      }
    }

    #{$variant-filled} & {
      border: none;
      background: transparent;

      &:hover::placeholder {
        color: $color-neutral-light-900;
      }
    }

    #{$rounded} & {
      border-radius: 50px;
    }

    #{$color-darker} & {
      border-color: $color-neutral-light-300;
      background-color: $color-neutral-light-300;
    }

    #{$color-lighter} & {
      border-color: $color-neutral-light-50;
      background-color: $color-neutral-light-50;
    }

    #{$error} & {
      border: 1px solid $color-error;
      color: $color-error;
      background-color: color.adjust($color-error, $lightness: 48%);

      &:focus {
        border-color: inherit;
      }
    }

    #{$icon} & {
      padding-inline: $space-12 $space-4;
    }

    #{$trailing-icon} & {
      padding-inline: $space-4 $space-12;
    }

    &::placeholder {
      @include text(regular, sm);

      color: $color-neutral-light-400;

      #{$error} & {
        color: color.adjust($color-error, $lightness: 25%);
      }
    }

    &:disabled {
      pointer-events: none;
      filter: brightness(1.2);
    }
  }

  &__reset {
    margin-right: $space-3;
    margin-left: auto;
  }
}
</style>
