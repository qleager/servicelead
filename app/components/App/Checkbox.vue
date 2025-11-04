<script lang="ts" setup>
interface Props {
  label?: string
  value?: null | string | number | bigint | Record<string, any>
  name?: string
  required?: boolean
  disabled?: boolean
  id?: string
}
const props = defineProps<Props>()

const model = defineModel<boolean>({ default: false })

const classname = computed(() => ([
  'checkbox',
  { 'checkbox-checked': model.value },
  { 'checkbox-disabled': props.disabled },
]))
</script>

<template>
  <div
    :class="classname"
    @click="model = !props.disabled && (model = !model)"
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

      <!-- <AppIcon
        v-if="model"
      /> -->
    </span>
    <span class="checkbox__label">
      {{ label }}
    </span>
  </div>
</template>

<style lang="scss">
.checkbox {
  $this: &;                                // default
  $hover: & + ':hover';                    // hover
  $active: & + ':active';                  // hoverpress
  $checked: & + '-checked';                // enter
  $disabled: & + '-disabled';              // disabled

  cursor: pointer;

  display: inline-flex;
  gap: $space-4;
  align-items: center;

  width: auto;
  height: 40px;
  border-radius: 4px;

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

    background-color: $color-neutral-light-100;
  }

  &__label {
    @include text(regular, sm);

    &:empty {
      display: none;
    }
  }

  #{$hover} &__bullet {
    background-color: $color-neutral-light-400;
  }

  #{$active} &__bullet {
    background-color: $color-primary
  }

  &#{$disabled} {
    pointer-events: none;
  }
  #{$disabled} &__bullet {
    border: 1px solid $color-neutral-light-400;
    background-color: transparent;
  }
  #{$disabled} &__label {
    color: $color-neutral-light-400;
  }
}
</style>
