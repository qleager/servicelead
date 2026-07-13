<script setup lang="ts">
import type { Size, Subset } from '~/types/ds'
import type { IconProps } from './Icon.vue'
import type { VNodeChild } from 'vue'
import { useElementSize, useMounted } from '@vueuse/core'

interface Props {
  disabled?: boolean
  error?: boolean
  icon?: IconProps['name']
  name?: string
  placeholder?: string
  rounded?: boolean
  size?: Subset<Size, 'md' | 'sm'>
  trailingIcon?: IconProps['name']
  type?: 'text' | 'password' | 'search' | 'email' | 'tel' | 'url'
  variant?: 'ghost' | 'soft' | 'outline'
}

interface Emits {
  blur: [event: Event]
  change: [event: Event]
  focus: [event: Event]
  input: [event: Event]
}

type Model = undefined | null | string

interface Slots {
  default: () => VNodeChild
  leading: () => VNodeChild
  trailing: () => VNodeChild
}

const isMounted = useMounted()
const leadingSlot = useTemplateRef<HTMLElement>('leadingSlot')
const trailingSlot = useTemplateRef<HTMLElement>('trailingSlot')

const props = withDefaults(defineProps<Props>(), {
  variant: 'outline',
  size: 'md',
})

const emit = defineEmits<Emits>()
const model = defineModel<Model>()
const slots = defineSlots<Slots>()

const { width: leadingSlotWidth } = useElementSize(leadingSlot, { width: 0, height: 0 }, { box: 'border-box' })
const { width: trailingSlotWidth } = useElementSize(trailingSlot, { width: 0, height: 0 }, { box: 'border-box' })
const { error, name, emitFormBlur, emitFormChange, emitFormInput, emitFormFocus } = useFormField(props)

const classname = computed(() => ([
  'input',
  `input-size-${props.size}`,
  `input-variant-${props.variant}`,
  {
    'input-error': error.value,
    'input-rounded': props.rounded,
  },
]))

const hasLeading = computed(() => Boolean(props.icon || slots.leading))
const hasTrailing = computed(() => Boolean(props.trailingIcon || slots.trailing))

const style = computed(() => isMounted.value
  ? {
      '--input-leading-slot-width': hasLeading.value ? `${leadingSlotWidth.value + 8}px` : undefined,
      '--input-trailing-slot-width': hasTrailing.value ? `${trailingSlotWidth.value}px` : undefined,
    }
  : undefined)

const onBlur = (event: Event) => {
  emitFormBlur()
  emit('blur', event)
}

const onChange = (event: Event) => {
  emitFormChange()
  emit('change', event)
}

const onFocus = (event: Event) => {
  emitFormFocus()
  emit('focus', event)
}

const onInput = (event: Event) => {
  emitFormInput()
  emit('input', event)
}
</script>

<template>
  <div
    :class="classname"
    :style
  >
    <div
      v-if="hasLeading"
      ref="leadingSlot"
      class="input__leading-slot"
    >
      <slot name="leading">
        <AppIcon
          v-if="icon"
          class="input__icon"
          :name="icon"
        />
      </slot>
    </div>

    <input
      ref="input"
      v-model="model"
      class="input__field"
      :disabled
      :name
      :placeholder
      :type
      @blur="onBlur"
      @change="onChange"
      @focus="onFocus"
      @input="onInput"
    >

    <div
      v-if="hasTrailing"
      ref="trailingSlot"
      class="input__trailing-slot"
    >
      <slot name="trailing">
        <AppIcon
          v-if="trailingIcon"
          class="input__trailing-icon"
          :name="trailingIcon"
        />
      </slot>
    </div>
  </div>
</template>

<style lang="scss">
.input {
  $this: &;

  ///
  $variant-ghost: $this + '-variant-ghost';
  $variant-soft: $this + '-variant-soft';
  $variant-outline: $this + '-variant-outline';

  ///
  $size-sm: $this + '-size-sm';
  $size-md: $this + '-size-md';

  ///
  $error: $this + '-error';
  $rounded: $this + '-rounded';

  position: relative;
  display: inline-flex;
  align-items: center;

  &__field {
    width: 100%;
    border: none;
    border-radius: $radius-2;

    background: none;
    box-shadow: none;

    &::placeholder {
      color: $color-neutral-400;
    }

    &:disabled {
      &::placeholder {
        color: $color-neutral-200;
      }
    }

    @include is($variant-outline) {
      border: 1px solid $color-neutral-200;

      &:hover {
        border-color: $color-neutral-400;
      }

      &:focus {
        border-color: $color-primary;
      }

      &:disabled {
        border-color: $color-neutral-100;
      }
    }

    @include is($variant-soft) {
      background-color: $color-neutral-50;

      &:hover {
        background-color: $color-neutral-100;
      }

      &:focus {
        background-color: $color-neutral-100;
      }

      &:disabled {
        background-color: $color-neutral-50;
      }
    }

    @include is($size-sm) {
      height: 40px;
      padding-block: $space-3;
      padding-inline: var(--input-leading-slot-width, #{$space-4}) var(--input-trailing-slot-width, #{$space-4});

      @include text(regular, sm);
    }

    @include is($size-md) {
      height: 48px;
      padding-block: $space-3;
      padding-inline: var(--input-leading-slot-width, #{$space-4}) var(--input-trailing-slot-width, #{$space-4});

      @include text(regular, md);
    }

    @include is($error + $variant-outline) {
      border: 1px solid var(--ui-color-error);
      color: var(--ui-color-error);

      &::placeholder {
        color: var(--ui-color-error);
      }
    }

    @include is($error + $variant-soft) {
      border: 1px solid var(--ui-color-error);
      color: var(--ui-color-error);
      background-color: $color-red-50;

      &::placeholder {
        color: var(--ui-color-error);
      }
    }

    @include is($error + $variant-ghost) {
      color: var(--ui-color-error);

      &::placeholder {
        color: var(--ui-color-error);
      }
    }

    @include is($rounded) {
      border-radius: 50px;
    }
  }

  &__leading-slot {
    position: absolute;
    inset-block: 0;
    inset-inline-start: 0;

    display: flex;
    align-items: center;

    @include is($size-sm) {
      padding-left: $space-3;
    }

    @include is($size-md) {
      padding-left: $space-3;
    }
  }

  &__trailing-slot {
    position: absolute;
    inset-block: 0;
    inset-inline-end: 0;

    display: flex;
    align-items: center;

    @include is($size-sm) {
      padding-right: $space-3;
    }

    @include is($size-md) {
      padding-right: $space-3;
    }
  }
}
</style>
