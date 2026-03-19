<script lang="ts" setup>
import type { VNodeChild } from 'vue'
import type { FloaterModel } from '@components/app/Floater.vue'
import type { WidgetSlots, WidgetProps } from '@components/app/Widget.vue'

interface Props {
  // type Props = WidgetProps или extends будет ломать run build
  description: WidgetProps['description']
  icon?: WidgetProps['icon']
  title?: WidgetProps['title']
}

interface Slots extends WidgetSlots {
  default?: (props: { isOpen: FloaterModel }) => VNodeChild
}

defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <AppFloater
    class="widget-dropdown"
    placement="bottom"
  >
    <template #default="{ isOpen }">
      <slot :is-open />
    </template>

    <template #content>
      <AppWidget
        class="widget-dropdown__drop"
        v-bind="$props"
      >
        <template
          v-if="$slots.description || description"
          #description
        >
          <slot name="description">
            {{ description }}
          </slot>
        </template>

        <template
          v-if="$slots.content"
          #content
        >
          <slot name="content" />
        </template>

        <template
          v-if="$slots.footer"
          #footer
        >
          <slot name="footer" />
        </template>
      </AppWidget>
    </template>
  </AppFloater>
</template>

<style lang="scss">
.widget-dropdown {
  $this: &;

  &__drop {
    box-shadow: $shadow-md;
  }
}
</style>
