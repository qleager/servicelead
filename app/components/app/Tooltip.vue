<script lang="ts" setup>
import type { VNodeChild } from 'vue'

interface Props {
  content?: string
}

interface Slots {
  content: () => VNodeChild
  default: () => VNodeChild
}

defineProps<Props>()

defineSlots<Slots>()

export type { Props as TooltipProps, Slots as TooltipSlots }
</script>

<template>
  <AppFloater
    class="tooltip"
    mode="hover"
    portal="#teleports"
  >
    <slot>
      <AppIcon
        class="tooltip__default-trigger"
        name="question"
      />
    </slot>
    <template #content>
      <div class="tooltip__content">
        <slot name="content">
          {{ content }}
        </slot>
      </div>
    </template>
  </AppFloater>
</template>

<style lang="scss">
.tooltip {
  $this: &;

  &__content {
    @include text(regular, xs);

    max-width: 420px;
    padding: $space-4;
    border-radius: $radius-3;

    color: $color-neutral-950;
    text-align: center;

    background: white;
    box-shadow: $shadow-md;
  }

  &__default-trigger {
    padding: $space-05;
    border: 1px solid $color-neutral-400;
    border-radius: 50px;
  }
}
</style>
