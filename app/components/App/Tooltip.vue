<script lang="ts" setup>
import type { FloaterProps } from './Floater.vue'

// TODO(YURA): давай пока уберем обвес, оставим только текст
interface Props extends FloaterProps {
  text: string
}

defineProps<Props>()

// withDefaults(defineProps<Props>(), {
//   mode: 'click',
//   placement: 'bottom',
//   dismissible: true,
//   width: 'auto',
//   portal: 'body',
// })

export type { Props as TooltipProps }
</script>

<template>
  <div class="tooltip">
    <!-- TODO(YURA): а тут ток mode="hover" оставим
      по макету вижу, что нам вряд ли понадобиться пока остальное
    -->
    <AppFloater
      :mode
      :placement
      :dismissible
      :width
      :portal
    >
      <div class="tooltip__slot tooltip__slot-default">
        <!-- TODO(YURA): и AppIcon уже используем, там пока просто красный квадрат - это ок -->
        <slot>
          <span class="tooltip__icon">ℹ️</span>
        </slot>
        <!-- TODO: добавить иконку AppIcon -->
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

    // TODO(YURA): neutral-950
    color: white;
    text-align: center;
    white-space: nowrap;

    background: $color-neutral-light-950;
  }
}
</style>
