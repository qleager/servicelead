<script lang="ts" setup>
import type { VNodeChild } from 'vue'
import type { IconProps } from './Icon.vue'

interface Props {
  description?: string
  icon?: IconProps['name']
  title?: string
}

interface Emits {
  'click:button': []
}

interface Slots {
  content: () => VNodeChild
  description?: () => VNodeChild
  footer?: () => VNodeChild
}

defineProps<Props>()

defineEmits<Emits>()

defineSlots<Slots>()

const isShowMoreListener = computed(() => getCurrentInstance()?.vnode?.props?.['onClick:button'])

export type { Props as WidgetProps, Slots as WidgetSlots }
</script>

<template>
  <AppCard class="widget">
    <template
      v-if="title"
      #title
    >
      <div class="widget__header">
        <AppTitle
          :icon
          :title
        />

        <AppButton
          v-if="isShowMoreListener"
          class="widget__button"
          color="neutral"
          icon="arrow_right"
          size="xs"
          variant="lined"
          @click="$emit('click:button')"
        />
      </div>
    </template>

    <template
      v-if="$slots.description || description"
      #description
    >
      <slot name="description">
        {{ description }}
      </slot>
    </template>

    <template #content>
      <slot name="content" />
    </template>

    <template
      v-if="$slots.footer"
      #footer
    >
      <slot name="footer" />
    </template>
  </AppCard>
</template>

<style lang="scss">
.widget {
  $this: &;

  &__header {
    display: flex;
  }

  &__button {
    margin-left: auto;
  }
}
</style>
