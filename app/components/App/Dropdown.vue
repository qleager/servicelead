<script lang="ts" setup>
import type { FloaterModel, FloaterProps } from './Floater.vue'

interface Props {
  mode?: FloaterProps['mode']
}

const props = defineProps<Props>()

const model = defineModel<FloaterModel>()

const classname = computed(() => [
  'dropdown',
  `dropdown-mode-${props.mode}`,
])
</script>

<template>
  <div :class="classname">
    <AppFloater
      v-model="model"
      width="min-reference"
      :mode
    >
      <div class="dropdown__slot dropdown__slot-default">
        <slot />
      </div>
      <template #content>
        <div class="dropdown__slot dropdown__slot-content">
          <slot name="content" />
        </div>
      </template>
    </AppFloater>
  </div>
</template>

<style lang="scss">
.dropdown {
  $this: &;

  z-index: 3;
  width: fit-content;

  &__slot {
    &-content {
      padding: $space-4 $space-2;
      border-radius: $radius-2;
      background: white;
      box-shadow: $shadow-light-mode;
    }
  }
}
</style>
