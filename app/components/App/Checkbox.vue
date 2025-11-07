<script lang="ts" setup>
interface Props {
  label?: string
  value?: null | string | number | bigint
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
        name="check"
        :size="24"
        class="checkbox__bullet-icon"
      />
    </span>
    <span class="checkbox__label">
      {{ label }}
    </span>
  </div>
</template>

<style lang="scss">
.checkbox {
  $this: &;
  $hover: & + ':hover';
  $active: & + ':active';
  $checked: & + '-checked';
  $disabled: & + '-disabled';

  cursor: pointer;

  display: inline-flex;
  gap: $space-4;
  align-items: center;

  width: auto;
  height: 40px;
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

    background-color: $color-neutral-light;

    #{$hover} & {
      background-color: $color-neutral-light-400;
    }

    #{$active} & {
      background-color: $color-primary
    }

    #{$checked} & {
      background-color: $color-primary
    }

    #{$disabled} & {
      border: 1px solid $color-neutral-light-400;
      background-color: transparent;
    }

    #{$checked}#{$disabled} & {
      background-color: $color-neutral-light-400;
    }
  }

  &__label {
    @include text(regular, sm);

    &:empty {
      display: none;
    }

    #{$disabled} & {
      color: $color-neutral-light-400;
    }
  }
}
</style>
