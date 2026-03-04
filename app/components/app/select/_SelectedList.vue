<script lang="ts" setup>
import type { SelectInjection, SelectMultipleModel } from './Select.vue'

interface Props {
  items: SelectMultipleModel
}

interface Emits {
  close: [number]
}

const { size } = inject('selectState') as SelectInjection

defineProps<Props>()

const emits = defineEmits<Emits>()

const classname = computed(() => [
  'select-selected-list',
  `select-selected-list-size-${size}`,
])

const tagSize = computed(() => {
  switch (size) {
    case 'md':
      return 'sm'
      break
    case 'sm':
      return 'xs'
      break
    default:
      return 'md'
      break
  }
})
</script>

<template>
  <div
    :class="classname"
  >
    <AppTag
      v-for="(item, index) in items"
      :key="index"
      closable
      color="neutral"
      :size="tagSize"
      variant="lined"
      @close="emits('close', index)"
    >
      {{ item }}
    </AppTag>
  </div>
</template>

<style lang="scss">
.select-selected-list {
  $this: &;
  $size-md: $this + '-size-md';
  $size-xs: $this + '-size-xs';

  overflow: auto;
  display: flex;
  gap: $space-1;

  &#{$size-xs} {
    $space: $space-3;

    margin-inline: -#{$space};
    padding-inline: $space;
  }

  &#{$size-md} {
    $space: $space-5;

    margin-inline: -#{$space};
    padding-inline: $space;
  }

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
