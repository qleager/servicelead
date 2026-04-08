<script lang="ts" setup>
import type { VNodeChild } from 'vue'
import type { Subset, Size } from '~/types/ds'

interface Props {
  caption?: string
  leadingValue?: string
  size?: Subset<Size, 'sm' | 'lg'>
  trailingValue?: string
  value?: string
}

interface Slots {
  caption: () => VNodeChild
  leadingValue: () => VNodeChild
  trailingValue: () => VNodeChild
  value: () => VNodeChild
}

const props = withDefaults(defineProps<Props>(), {
  size: 'lg',
})

const slots = defineSlots<Slots>()

const hasCaption = computed(() => props.caption !== undefined || !!slots.caption)
const hasLeadingValue = computed(() => props.leadingValue !== undefined || !!slots.leadingValue)
const hasTrailingValue = computed(() => props.trailingValue !== undefined || !!slots.trailingValue)

const classname = computed(() => ([
  'labeled-value',
  `labeled-value-size-${props.size}`,
]))

export type { Props as LabeledValueProps }
</script>

<template>
  <div :class="classname">
    <div
      v-if="hasCaption"
      class="labeled-value__caption"
    >
      <slot name="caption">
        {{ caption }}
      </slot>
    </div>
    <div
      class="labeled-value__content"
    >
      <div
        v-if="hasLeadingValue"
        class="labeled-value__leading"
      >
        <slot name="leadingValue">
          {{ leadingValue }}
        </slot>
      </div>
      <div
        class="labeled-value__value"
      >
        <slot name="value">
          {{ value }}
        </slot>
      </div>
      <div
        v-if="hasTrailingValue"
        class="labeled-value__trailing"
      >
        <slot name="trailingValue">
          {{ trailingValue }}
        </slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.labeled-value {
  $this: &;
  $size-sm: $this + '-size-sm';
  $size-lg: $this + '-size-lg';

  display: flex;
  flex-direction: column;
  gap: $space-1;
  width: fit-content;

  &__caption {
    @include text(regular, xs);

    color: $color-neutral-400;
    letter-spacing: -.03em;
  }

  &__content {
    display: flex;
    gap: $space-1;
    align-items: baseline;
  }

  &__leading,
  &__trailing,
  &__value {
    line-height: 1 !important;
    color: $color-neutral-950;
  }

  &__leading {
    line-height: 1 !important;
    color: $color-neutral-950;

    @include is($size-sm) {
      @include text(medium, lg);

      letter-spacing: -.03em;
    }

    @include is($size-lg) {
      @include text(regular, 2xl);
    }
  }

  &__value {
    line-height: 1 !important;
    color: $color-neutral-950;

    @include is($size-sm) {
      @include text(medium, lg);

      letter-spacing: -.03em;
    }

    @include is($size-lg) {
      @include text(medium, 5xl);
    }
  }

  &__trailing {
    @include is($size-sm) {
      @include text(regular, sm);
    }

    @include is($size-lg) {
      @include text(regular, 2xl);
    }
  }
}
</style>
