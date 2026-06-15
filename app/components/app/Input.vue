<script lang="ts" setup>
import type { Size, Subset } from '~/types/ds'
import type { IconProps } from './Icon.vue'
import type { VNodeChild } from 'vue'

interface Props {
  disabled?: boolean
  error?: boolean
  icon?: IconProps['name']
  placeholder?: string
  rounded?: boolean
  size?: Subset<Size, 'md' | 'sm'>
  trailingIcon?: IconProps['name']
  type?: 'text' | 'number' | 'password' | 'search' | 'hidden' | 'email' | 'tel' | 'url' | string
  variant?: 'ghost' | 'soft' | 'outline'
}

interface Slots {
  default: () => VNodeChild
  leading: () => VNodeChild
  trailing: () => VNodeChild
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'outline',
  size: 'md',
})

defineSlots<Slots>()

const classname = computed(() => ([
  'input',
  `input-size-${props.size}`,
  `input-variant-${props.variant}`,
  {
    'input-error': props.error,
    'input-rounded': props.rounded,
  },
]))
</script>

<template>
  <div :class="classname">
    <AppIcon
      v-if="icon"
      class="input__icon"
      :name="icon"
    />
    <input
      class="input__field"
      :disabled
      :placeholder
      :type
    >
    <AppIcon
      v-if="trailingIcon"
      class="input__trailing-icon"
      :name="trailingIcon"
    />
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

  &__field {
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
      padding: $space-3 $space-4;

      @include text(regular, sm);
    }

    @include is($size-md) {
      height: 48px;
      padding: $space-3 $space-4;

      @include text(regular, md);
    }

    @include is($error + $variant-outline) {
      border: 1px solid var(--ui-color-error);
      color: var(--ui-color-error);

      &::placeholder {
        color: var(--ui-color-error)
      }
    }

    @include is($error + $variant-soft) {
      border: 1px solid var(--ui-color-error);
      color: var(--ui-color-error);
      background-color: $color-red-50;

      &::placeholder {
        color: var(--ui-color-error)
      }
    }

    @include is($error + $variant-ghost) {
      color: var(--ui-color-error);

      &::placeholder {
        color: var(--ui-color-error)
      }
    }

    @include is($rounded) {
      border-radius: 50px;
    }
  }
}
</style>
