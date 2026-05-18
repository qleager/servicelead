<script lang="ts" setup>
import type { IconProps } from '~/components/app/Icon.vue'
import type { Size, Subset } from '~/types/ds'

interface Props {
  autocomplete?: string
  color?: 'white' | 'neutral' | 'primary'
  disabled?: boolean
  error?: boolean
  icon?: IconProps['name']
  name?: string
  placeholder?: string
  reset?: boolean
  rounded?: boolean
  size?: Subset<Size, 'xs' | 'sm' | 'md' | 'lg'>
  trailingIcon?: boolean
  // TODO: взять логику с nuxt ui
  type?: 'text' | 'number' | 'password' | 'search'
  variant?: 'solid' | 'outline'
}

interface Emits {
  click: []
  input: []
  reset: []
}

type Model = null | string | number

const props = withDefaults(defineProps<Props>(), {
  variant: 'outline',
  size: 'md',
  placeholder: 'Введите...',
  color: 'neutral',
})

const emits = defineEmits<Emits>()

const model = defineModel<Model>()

const inputElement = useTemplateRef<HTMLInputElement>('field')

const { error, name } = useFormField(props)

const classname = computed(() => ([
  'input',
  `input-size-${props.size}`,
  `input-variant-${props.variant}`,
  `input-color-${props.color}`,
  {
    'input-icon': props.icon,
    'input-icon-trailing': props.trailingIcon,
    'input-rounded': props.rounded,
    'input-error': error.value,
  },
]))

const isResetVisible = computed(() => model.value && String(model.value) && props.reset)
// Hide the icon when reset button is visible and icon is trailing
const isIconVisible = computed(() => !(props.trailingIcon && isResetVisible.value))

const onReset = () => {
  model.value = null
  emits('reset')
}

const onClick = () => {
  inputElement.value?.focus()
  emits('click')
}

export type { Props as InputProps, Emits as InputEmits, Model as InputModel }
</script>

<template>
  <div
    :class="classname"
    @click="onClick"
  >
    <AppIcon
      v-if="isIconVisible && icon"
      class="input__icon"
      :name="icon"
    />
    <input
      ref="field"
      v-model="model"
      :autocomplete
      class="input__field"
      :disabled
      :name
      :placeholder
      :type
    >
    <Transition name="input__transition-reset">
      <AppButton
        v-if="isResetVisible"
        class="input__reset"
        color="neutral"
        icon="close"
        size="xs"
        variant="link"
        @click="onReset"
      />
    </Transition>
  </div>
</template>

<style lang="scss">
@use 'sass:color';

.input {
  // Состояния комопонента
  $this: &;
  $variant-outline: $this + '-variant-outline';
  $variant-solid: $this + '-variant-solid';
  $variant-nofilled: $this + '-variant-nofilled';
  $white-color: $this + '-color-white';
  $neutral-color: $this + '-color-neutral';
  $primary-color: $this + '-color-primary';
  $error: $this + '-error';
  $rounded: $this + '-rounded';
  $size-xs: $this + '-size-xs';
  $size-sm: $this + '-size-sm';
  $size-md: $this + '-size-md';
  $size-lg: $this + '-size-lg';
  $icon: $this + '-icon';
  $trailing-icon: $this + '-icon-trailing';

  // Стили блока
  cursor: text;

  position: relative;
  z-index: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 250px;
  height: 48px;
  border-radius: $radius-2;

  &:hover {
    border-color: $color-neutral-400;
    transition: $hover-duration-sm;
  }

  &:focus {
    border-color: $color-neutral-400;
    transition: $active-duration-sm;
  }

  &:focus-within {
    // outline: 1px solid;
    // outline-color: transparent;
    // outline-offset: -1px;
    transition: $active-duration-sm;
  }

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

  &#{$variant-outline} {
    --variant-outline-background-color: transparent;
    --variant-outline-text-color: unset;

    border: 1px solid;
    color: var(--variant-outline-text-color) !important;
    background-color: var(--variant-outline-background-color) !important;
  }

  &#{$variant-solid} {
    --variant-solid-text-color: inherit;

    border: none !important;
    color: var(--variant-solid-text-color) !important;
    background-color: transparent;
    outline: none !important
  }

  &#{$variant-nofilled} {
    --variant-nofilled-background-color: transparent;
    --variant-nofilled-text-color: inherit;

    border: none !important;
    color: var(--variant-nofilled-text-color) !important;
    background: var(--variant-nofilled-background-color) !important;
  }

  &#{$rounded} {
    border-radius: 50px !important;
  }

  &#{$size-xs} {
    gap: $space-2;
    height: 32px;
    padding-inline: $space-3;
    border-radius: $radius-2;

    @include text(regular, xs);
  }

  // Стили блока при состоянии компонента
  &#{$size-sm} {
    gap: $space-3;
    height: 40px;
    padding-inline: $space-4;
    border-radius: $radius-2;

    @include text(regular, xs);
  }

  // Стили блока при состоянии компонента
  &#{$size-md} {
    gap: $space-4;
    height: 48px;
    padding-inline: $space-5;
    border-radius: $radius-2;

    @include text(regular, xs);
  }

  &#{$size-lg} {
    gap: $space-5;
    height: 56px;
    padding-inline: $space-6;
    border-radius: $radius-3;

    @include text(regular, sm);
  }

  &#{$white-color} {
    --variant-outline-text-color: white;

    border-color: white;
    color: white;
    background-color: white;

    &:hover {
      --variant-outline-background-color: white;
      --variant-nofilled-background-color: white;
      --variant-outline-text-color: white;

      border-color: #{$color-neutral-50};
      color:  #{$color-neutral-950};
      background-color: white;
    }

    &:active {
      --variant-nofilled-background-color: #{$color-neutral-100};
      --variant-outline-background-color: #{$color-neutral-100};

      border-color: #{$color-neutral-150};
      color: #{$color-neutral-950};
      background-color: white;
    }

    &:focus-within {
      --variant-nofilled-text-color: #{$color-neutral-500};
      --variant-outline-background-color: white;

      transform: $active-duration-sm;
      border-color: white;
      color: $color-neutral-950 !important;
      background-color: white;
    }
  }

  &#{$neutral-color} {
    --variant-nofilled-text-color: #{$color-neutral-400};

    transform: $blur-duration-sm;
    border-color: $color-neutral-300;
    color: $color-neutral-300;
    background-color: $color-neutral-100;

    &:hover {
      --variant-nofilled-text-color: #{$color-neutral-500};
      --variant-outline-background-color: transparent;

      transform: $hover-duration-sm;
      border-color: $color-neutral-300;
      background-color: $color-neutral-100;
    }

    &:focus-within {
      --variant-nofilled-text-color: #{$color-neutral-500};
      --variant-outline-background-color: transparent;

      transform: $active-duration-sm;
      border-color: $color-neutral-300;
      background-color: $color-neutral-100;
    }
  }

  &#{$primary-color} {
    --variant-solid-text-color: white;
    --variant-nofilled-background-color: transparent;
    --variant-outline-text-color: #{$color-primary};

    border-color: $color-primary;
    color: $color-primary;
    background-color: $color-primary;

    &:hover {
      --variant-nofilled-background-color: #{$color-primary-100};
      --variant-outline-background-color: #{$color-primary-100};

      border-color: $color-primary-600;
      background-color: $color-primary-600;
    }

    &:active {
      border-color: #{$color-primary-700};
      background-color: #{$color-primary-700};
    }
  }

  &#{$error} {
    border: 1px solid $color-error;
    color: $color-error;
    background-color: color.adjust($color-error, $lightness: 48%);

    &:focus {
      border-color: inherit;
    }
  }

  // Стиль элемента блока
  &__field {
    --field-text-color: #{$color-neutral-950};

    flex: 1;

    height: 100%;
    margin: 0;
    padding: 0;
    border: none;
    border-radius: unset;

    color: var(--field-text-color);

    background-color: transparent;

    #{$size-xs} & {
      @include text(regular, 2xs);
    }

    #{$size-sm} & {
      @include text(regular, xs);
    }

    #{$size-md} & {
      @include text(regular, sm);
    }

    #{$size-lg} & {
      @include text(regular, md);
    }

    &::placeholder {
      color: $color-neutral-400;

      #{$primary-color} & {
        color: $color-primary-400;
      }

      #{$error} & {
        color: color.adjust($color-error, $lightness: 25%);
      }
    }

    &:disabled {
      pointer-events: none;
      filter: brightness(1.2);
    }
  }

  // Стили элемента блока
  &__icon {
    pointer-events: none;
    flex-shrink: 0;
    color: inherit;

    #{$size-xs} & {
      width: 16px;
      height: 16px;
      margin-inline: -#{$space-05};
    }

    #{$size-sm} & {
      width: 20px;
      height: 20px;
      margin-inline: -#{$space-1};
    }

    #{$size-md} & {
      width: 24px;
      height: 24px;
      margin-inline: -#{$space-2};
    }

    #{$size-lg} & {
      width: 28px;
      height: 28px;
      margin-inline: -#{$space-3};
    }

    // Стиль элемента блока при состоянии компонента $trailing-icon
    #{$trailing-icon} & {
      order: 1;
    }
  }

  &__reset {
    cursor: pointer;
    position: relative;
    z-index: 1;
    margin-left: auto;

    #{$size-xs} & {
      margin-inline: -#{$space-05};
    }

    #{$size-sm} & {
      margin-inline: -#{$space-1};
    }

    #{$size-md} & {
      margin-inline: -#{$space-2};
    }

    #{$size-lg} & {
      margin-inline: -#{$space-3};
    }
  }

  &__transition {
    &-reset {
      &-enter {
        &-from {
          visibility: hidden;
        }

        &-to {
          animation: fadeInRight $show-duration-sm forwards;
        }
      }

      &-leave {
        &-to {
          animation: fadeOutRight $hide-duration-sm forwards;
        }
      }
    }
  }
}
</style>
