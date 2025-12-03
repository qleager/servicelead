<script lang="ts" setup>
import type { FloaterProps } from './Floater.vue'

interface Props extends FloaterProps {
  text: string
}

defineProps<Props>()

export type { Props as TooltipProps }
</script>

<template>
  <div class="tooltip">
    <AppFloater
      mode="hover"
      :placement
      :dismissible
      :width
      :portal
    >
      <div class="tooltip__slot tooltip__slot-default">
        <slot>
          <AppIcon name="question"/>
        </slot>
      </div>
      <template #content>
        <div class="tooltip__content">
          {{ text }}
        </div>
      </template>
    </AppFloater>
  </div>
</template>

<style lang="scss">
.tooltip {
  $this: &;

  position: relative;
  display: inline-block;

  &__icon {
    cursor: pointer;
  }

  &__content {
    @include text(medium, xs);

    padding: $space-1 $space-2;
    border-radius: $radius-1;

    color: $color-neutral-light-950;
    text-align: center;
    white-space: nowrap;

    background: white;
  }
}
</style>
