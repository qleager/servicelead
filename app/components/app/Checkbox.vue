<script lang="ts" setup>
import type { Sizes } from '~/types/ds'

interface Props {
  disabled?: boolean
  id?: string
  label?: string
  name?: string
  required?: boolean
  size?: Sizes
  value?: null | string | number | bigint
}

interface Slots {
  label: () => void
}

type Model = boolean

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
})

const slots = defineSlots<Slots>()

const model = defineModel<Model>({ default: false })

const classname = computed(() => ([
  'checkbox',
  `checkbox-size-${props.size}`,
  { 'checkbox-checked': model.value },
  { 'checkbox-disabled': props.disabled },
]))
const isLabelVisible = computed(() => props.label || slots.label)

export type { Props as CheckboxProps, Model as CheckboxModel }
</script>

<template>
  <button
    :class="classname"
    @click="model = !model"
  >
    <input
      v-model="model"
      class="checkbox__field"
      :disabled
      :name
      :required
      tabindex="-1"
      type="checkbox"
      :value
      :id
    >
    <span class="checkbox__bullet">
      <AppIcon
        v-if="model"
        class="checkbox__bullet-icon"
        name="check_24"
      />
    </span>
    <div
      v-if="isLabelVisible"
      class="checkbox__label"
    >
      <slot name="label">
        <span
          v-if="label"
          class="checkbox__label-text"
        >
          {{ label }}
        </span>
      </slot>
    </div>
  </button>
</template>

<style lang="scss">
.checkbox {
  $this: &;
  $hover: $this + ':hover';
  $active: $this + ':active';
  $checked: $this + '-checked';
  $disabled: $this + '-disabled';
  $size-xs: $this + '-size-xs';
  $size-sm: $this + '-size-sm';
  $size-md: $this + '-size-md';
  $size-lg: $this + '-size-lg';

  cursor: pointer;

  display: inline-flex;
  align-items: center;

  width: auto;
  border-radius: 4px;

  &-disabled {
    pointer-events: none;
  }

  &#{$size-xs} {
    gap: $space-1;
  }

  &#{$size-sm}{
    gap: $space-2;
  }

  &#{$size-md}{
    gap: $space-3;
  }

  &#{$size-lg}{
    gap: $space-4;
  }

  &__field {
    position: absolute;

    overflow: hidden;

    width: 1px;
    height: 1px;

    white-space: nowrap;

    clip-path: inset(50%);
  }

  &__bullet {
    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 4px;

    background-color: $color-neutral-100;

    transition: $blur-duration-sm;

    #{$hover} & {
      background-color: $color-neutral-400;
      transition: $hover-duration-sm;
    }

    #{$active} & {
      background-color: $color-primary;
      transition: $active-duration-sm;
    }

    #{$checked} & {
      background-color: $color-primary !important
    }

    #{$disabled} & {
      border: 1px solid $color-neutral-400;
      background-color: transparent;
    }

    #{$checked}#{$disabled} & {
      background-color: $color-neutral-400;
    }

    #{$size-xs} & {
      width: 16px;
      height: 16px;
    }

    #{$size-sm} & {
      width: 20px;
      height: 20px;
    }

    #{$size-md} & {
      width: 24px;
      height: 24px;
    }

    #{$size-lg} & {
      width: 28px;
      height: 28px;
    }

    &-icon {
      width: 100%;
      height: 100%;
      color: white;
    }
  }

  &__label {
    &-text {
      &:empty {
        display: none;
      }

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

      #{$disabled} & {
        color: $color-neutral-400;
      }
    }
  }
}
</style>
