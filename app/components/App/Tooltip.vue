<script lang="ts" setup>
interface Props {
  text: string
}

defineProps<Props>()

export type { Props as TooltipProps }
</script>

<template>
  <div class="tooltip">
    <AppFloater
      mode="hover"
    >
      <div class="tooltip__slot tooltip__slot-default">
        <slot>
          <AppIcon name="question" />
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
    @include text(regular, xs);

    max-width: 420px;
    padding: $space-4;
    border-radius: $radius-3;

    color: $color-neutral-light-950;
    text-align: center;

    background: white;
  }
}
</style>
