<script lang="ts" setup>
import type { FloaterProps } from './Floater.vue'

interface Props extends FloaterProps {
  text: string
}

withDefaults(defineProps<Props>(), {
  mode: 'click',
  placement: 'bottom',
  dismissible: true,
  width: 'auto',
  portal: 'body',
})

const classname = 'tooltip'

export type { Props as TooltipProps }
</script>

<template>
  <div :class="classname">
    <AppFloater
      :mode
      :placement
      :dismissible
      :width
      :portal
    >
      <div class="tooltip__slot tooltip__slot-default">
        <slot>
          <span class="tooltip__icon">ℹ️</span>
        </slot>
        <!-- TODO: добавить иконку -->
        <!-- здесь показываем иконку info, если слот не задан -->
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

    color: white;
    text-align: center;
    white-space: nowrap;

    background: $color-neutral-light-950;
  }
}
</style>
