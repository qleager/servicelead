<script lang="ts" setup>
import type { Colors } from '~/types/ds/colors'
import type { Sizes } from '~/types/ds/sizes'

interface Props {
  color?: Colors
  size?: Sizes
  position?: 'top-left'|'top-right'|'bottom-left'|'bottom-right'
  text?: string
  inset?: boolean
  standalone?: boolean
}

const slots = useSlots()

const props = withDefaults(defineProps<Props>(), {
  color: 'primary',
  size: 'md',
  position: 'top-right' ,
})

const classname = computed(() => [
  'chip',
  `chip-color-${props.color}`,
  `chip-size-${props.size}`,
  !props.standalone && `chip-position-${props.position}`,
  { 
    'chip-inset': props.inset,
    'chip-standalone': props.standalone,
    'chip-has-content': hasContent.value,
  },
])

const hasContent = computed(() => {
  if (props.text && props.text.trim().length > 0) return true
  return Boolean(slots.content?.().length)
})

</script>

<template>
  <div class='chip-anchor'>
    <span :class=classname>
      <div class='chip__slot chip__slot-content'>
        <slot name="content">
          {{ text }}
        </slot>
      </div>
    </span>

    <div class='chip__slot chip__slot-default'>
      <slot />
    </div>
  </div>
</template>

<style lang="scss">

.chip {
  $this: &;
  $inset: $this + '-inset';
  $has-content: $this + '-has-content';
  $standalone: $this + '-standalone';

  // positions
  $position-top-right: $this + '-position-top-right';
  $position-top-left: $this + '-position-top-left';
  $position-bottom-right: $this + '-position-bottom-right';
  $position-bottom-left: $this + '-position-bottom-left';

  // sizes
  $size-sm: $this + '-size-sm';
  $size-md: $this + '-size-md';
  $size-lg: $this + '-size-lg';
  $chip-size-sm: 10px;
  $chip-size-md: 12px;
  $chip-size-lg: 14px;

  // colors
  $primary-color: $this + '-color-primary';
  $neutral-color: $this + '-color-neutral';
  $gray-color: $this + '-color-gray';
  $red-color: $this + '-color-red';
  $yellow-color: $this + '-color-yellow';
  $green-color: $this + '-color-green';
  $blue-color: $this + '-color-blue';
  $purple-color: $this + '-color-purple';
  $chip-float: 50%;

  user-select: none;

  position: absolute;
  z-index: 1;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  border-radius: $space-9;

  white-space: nowrap;
  
  &#{$size-sm} {
    @include text(regular, 2xs);

    min-width: $chip-size-sm;
    min-height: $chip-size-sm;
  }

  &#{$size-md} {
    @include text(regular, xs);

    min-width: $chip-size-md;
    min-height: $chip-size-md;
  }

  &#{$size-lg} {
    @include text(regular, sm);

    min-width: $chip-size-lg;
    min-height: $chip-size-lg;
  }

  &#{$primary-color} {
    background-color: $color-primary;
  }

  &#{$neutral-color} {
    background-color: $color-neutral;
  }

  &#{$gray-color} {
    background-color: $color-gray;
  }

  &#{$red-color} {
    background-color: $color-red;
  }

  &#{$yellow-color} {
    background-color: $color-yellow;
  }

  &#{$green-color} {
    background-color: $color-green;
  }

  &#{$blue-color} {
    background-color: $color-blue;
  }

  &#{$purple-color} {
    background-color: $color-purple;
  }

  &#{$position-top-right} {
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
  }

  &#{$position-top-left} {
    top: 0;
    left: 0;
    transform: translate(-50%, -50%);
  }

  &#{$position-bottom-right} {
    right: 0;
    bottom: 0;
    transform: translate(50%, 50%);
  }

  &#{$position-bottom-left} {
    bottom: 0;
    left: 0;
    transform: translate(-50%, 50%);
  }

  &#{$has-content} {
    width: auto;
    min-width: fit-content;
    height: auto;
    min-height: fit-content;

    color: $color-neutral-950;
  }

  &#{$standalone} {
    position: static;
    z-index: auto;
  }

  &#{$inset} {
    transform: none;
  }

  &-anchor {
    position: relative;
    display: inline-flex;
    align-items: center;

    &:has(.chip-standalone) {
      gap: $space-3;
    }
  }

  &__slot {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
}
</style>