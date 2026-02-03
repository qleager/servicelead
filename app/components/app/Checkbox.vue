<script lang="ts" setup>
interface Props {
  label?: string
  value?: null | string | number | bigint
  name?: string
  required?: boolean
  disabled?: boolean
  id?: string
}

interface Slots {
  label: () => void
}

type Model = boolean

const props = defineProps<Props>()

const slots = defineSlots<Slots>()

const model = defineModel<Model>({ default: false })

const classname = computed(() => ([
  'checkbox',
  { 'checkbox-checked': model.value },
  { 'checkbox-disabled': props.disabled },
]))
const isLabelVisible = computed(() => props.label || slots.label)

export type { Props as CheckboxProps, Model as CheckboxModel }
</script>

<template>
  <div
    :class="classname"
    @click="model = !model"
  >
    <input
      :id
      v-model="model"
      class="checkbox__field"
      type="checkbox"
      :name
      :value
      :required
      :disabled
    >
    <span class="checkbox__bullet">
      <AppIcon
        v-if="model"
        name="check_24"
        :size="24"
        class="checkbox__bullet-icon"
      />
    </span>
    <div
      v-if="isLabelVisible"
      class="checkbox__label"
    >
      <span
        v-if="label"
        class="checkbox__label-text"
      >
        {{ label }}
      </span>
      <slot name="label" />
    </div>
  </div>
</template>

<style lang="scss">
.checkbox {
  $this: &;
  $hover: $this + ':hover';
  $active: $this + ':active';
  $checked: $this + '-checked';
  $disabled: $this + '-disabled';

  cursor: pointer;

  display: inline-flex;
  gap: $space-4;
  align-items: center;

  width: auto;
  min-height: 40px;
  border-radius: 4px;

  &-disabled {
    pointer-events: none;
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
    display: inline-flex;
    align-items: center;
    justify-content: center;

    width: 24px;
    height: 24px;
    border-radius: 4px;

    background-color: $color-neutral-100;

    transition: $blur-duration-sm;

    &-icon {
      color: white
    }

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
  }

  &__label-text {
    @include text(regular, sm);

    &:empty {
      display: none;
    }

    #{$disabled} & {
      color: $color-neutral-400;
    }
  }
}
</style>
