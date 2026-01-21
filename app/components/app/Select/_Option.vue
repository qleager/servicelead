<script lang="ts" setup>
import type { SelectValue } from './Select.vue'

interface Props {
  label: string
  value: SelectValue
  isSelected?: boolean
  checkbox?: boolean
}

const props = defineProps<Props>()

const isIndicatorVisible = computed(() => props.isSelected && !props.checkbox)

export type { Props as SelectOptionProps }
</script>

<template>
  <div
    class="select-option"
    aria-selected
  >
    <AppCheckbox
      v-if="checkbox"
      class="select-option__checkbox"
      :model-value="isSelected"
    />
    <div class="select-option__label">
      {{ label }}
    </div>
    <AppIcon
      v-if="isIndicatorVisible"
      name="check_24"
      class="select-option__indicator"
    />
  </div>
</template>

<style lang="scss">
.select-option {
  cursor: pointer;

  display: flex;
  gap: $space-4;
  align-items: center;

  height: 40px;
  padding: $space-2;
  border-radius: $radius-2;

  transition: $blur-duration-sm;

  &:hover {
    background-color: $color-neutral-50;
    transition: $hover-duration-sm;
  }

  &__checkbox {
    pointer-events: none;
  }

  &__label {
    @include text(regular, sm);
  }

  &__indicator {
    margin-left: auto;
  }
}
</style>
