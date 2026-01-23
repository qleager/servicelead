<script lang="ts" setup>
import type { IconProps } from './Icon.vue'

interface Props {
  variant?: 'filled' | 'soft' | 'lined' | 'nofilled'
  color?: 'white' | 'primary' | 'neutral' | 'gray' | 'red' | 'yellow' | 'green' | 'blue' | 'purple'
  icon?: IconProps['name']
  trailingIcon?: boolean
  size?: 'sm' | 'md' | 'lg'
  actionable?: boolean
  closable?: boolean
  rounded?: boolean
}

interface Emits {
  close: []
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'filled',
  color: 'primary',
  size: 'md',
  rounded: true,
})

const emits = defineEmits<Emits>()

const classname = computed(() => ([
  'tag',
  `tag-variant-${props.variant}`,
  `tag-color-${props.color}`,
  `tag-size-${props.size}`,
  {
    'tag-icon': props.icon,
    'tag-actionable': props.actionable,
    'tag-rounded': props.rounded,
    'tag-icon-trailing': props.icon && props.trailingIcon,
  },
]))
</script>

<template>
  <span :class="classname">
    <AppIcon
      v-if="icon"
      :name="icon"
      class="tag__icon"
    />
    <span class="tag__slot">
      <slot />
    </span>
    <AppIcon
      v-if="closable"
      class="tag__close"
      name="close_20"
      @click.stop="emits('close')"
    />
  </span>
</template>

<style lang="scss">
.tag {
  $this: &;
  $variant-filled: $this + '-variant-filled';
  $variant-soft: $this + '-variant-soft';
  $variant-lined: $this + '-variant-lined';
  $variant-nofilled: $this + '-variant-nofilled';
  $size-xs: $this + '-size-xs';
  $size-sm: $this + '-size-sm';
  $size-md: $this + '-size-md';
  $size-lg: $this + '-size-lg';
  $actionable: $this + '-actionable';
  $rounded: $this + '-rounded';
  $white-color: $this + '-color-white';
  $primary-color: $this + '-color-primary';
  $neutral-color: $this + '-color-neutral';
  $gray-color: $this + '-color-gray';
  $red-color: $this + '-color-red';
  $yellow-color: $this + '-color-yellow';
  $green-color: $this + '-color-green';
  $blue-color: $this + '-color-blue';
  $purple-color: $this + '-color-purple';
  $icon: $this + '-icon';
  $icon-trailing: $this + '-icon-trailing';

  cursor: default;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: fit-content;

  &#{$rounded} {
    border-radius: 50px !important;
  }

  &#{$variant-filled} {
    --variant-filled-text-color: inherit;

    color: var(--variant-filled-text-color);
    background-color: transparent;
  }

  &#{$variant-soft} {
    --variant-soft-text-color: inherit;
    --variant-soft-background-color: transparent;

    color: var(--variant-soft-text-color);
    background-color: var(--variant-soft-background-color) !important;
  }

  &#{$variant-lined} {
    --variant-lined-text-color: unset;

    border: 1px solid transparent;
    color: var(--variant-lined-text-color);
    background-color: transparent !important;
  }

  &#{$variant-nofilled} {
    --variant-nofilled-text-color: inherit;

    border: none !important;
    color: var(--variant-nofilled-text-color) ;
    background-color: transparent !important;
  }

  &#{$actionable} {
    cursor: pointer;
    transition: $blur-duration-sm;

    &:hover {
      filter: grayscale(.2);
      transition: $hover-duration-sm;
    }

    &:active {
      filter: grayscale(.3);
      transition: $active-duration-sm;
    }
  }

  &#{$white-color} {
    --variant-lined-text-color: white;
    --variant-filled-text-color: #{$color-neutral-950};
    --variant-nofilled-text-color: white;
    --variant-soft-text-color: #{$color-neutral-700};
    --variant-soft-background-color: white;

    border-color: white;
    background-color: white;
  }

  &#{$primary-color} {
    --variant-filled-text-color: white;
    --variant-lined-text-color: #{$color-primary};
    --variant-nofilled-text-color: #{$color-primary};
    --variant-soft-text-color: #{$color-primary-700};
    --variant-soft-background-color: #{$color-primary-50};

    border-color: $color-primary;
    background-color: $color-primary;
  }

  &#{$neutral-color} {
    --variant-lined-text-color: #{$color-neutral-950};
    --variant-nofilled-text-color: #{$color-neutral-400};
    --variant-soft-text-color: #{$color-neutral-700};
    --variant-soft-background-color: #{$color-neutral-50};

    border-color: $color-neutral-300;
    background-color: $color-neutral-100;
  }

  &#{$gray-color} {
    --variant-lined-text-color: #{$color-gray-950};
    --variant-nofilled-text-color: #{$color-gray-400};
    --variant-soft-text-color: #{$color-gray-700};
    --variant-soft-background-color: #{$color-gray-50};

    border-color: $color-gray-300;
    background-color: $color-gray-100;
  }

  &#{$red-color} {
    --variant-lined-text-color: #{$color-red-950};
    --variant-nofilled-text-color: #{$color-red-400};
    --variant-soft-text-color: #{$color-red-700};
    --variant-soft-background-color: #{$color-red-50};

    border-color: $color-red-300;
    background-color: $color-red-100;
  }

  &#{$yellow-color} {
    --variant-lined-text-color: #{$color-yellow-950};
    --variant-nofilled-text-color: #{$color-yellow-400};
    --variant-soft-text-color: #{$color-yellow-700};
    --variant-soft-background-color: #{$color-yellow-50};

    border-color: $color-yellow-300;
    background-color: $color-yellow-100;
  }

  &#{$green-color} {
    --variant-lined-text-color: #{$color-green-950};
    --variant-nofilled-text-color: #{$color-green-400};
    --variant-soft-text-color: #{$color-green-700};
    --variant-soft-background-color: #{$color-green-50};

    border-color: $color-green-300;
    background-color: $color-green-100;
  }

  &#{$blue-color} {
    --variant-lined-text-color: #{$color-blue-950};
    --variant-nofilled-text-color: #{$color-blue-400};
    --variant-soft-text-color: #{$color-blue-700};
    --variant-soft-background-color: #{$color-blue-50};

    border-color: $color-blue-300;
    background-color: $color-blue-100;
  }

  &#{$purple-color} {
    --variant-lined-text-color: #{$color-purple-950};
    --variant-nofilled-text-color: #{$color-purple-400};
    --variant-soft-text-color: #{$color-purple-700};
    --variant-soft-background-color: #{$color-purple-50};

    border-color: $color-purple-300;
    background-color: $color-purple-100;
  }

  &#{$size-xs} {
    gap: $space-1;
    height: 16px;
    padding-inline: $space-1;
    border-radius: $radius-1;

    @include text(regular, 2xs);
  }

  &#{$size-sm} {
    gap: $space-1;
    height: 24px;
    padding-inline: $space-2;
    border-radius: $radius-2;

    @include text(regular, xs);
  }

  &#{$size-md} {
    gap: $space-2;
    height: 32px;
    padding-inline: $space-3;
    border-radius: $radius-2;

    @include text(regular, xs);
  }

  &#{$size-lg} {
    gap: $space-3;
    height: 40px;
    padding-inline: $space-4;
    border-radius: $radius-2;

    @include text(regular, sm);
  }

  &#{icon-trailing} {
    justify-content: flex-end;
  }

  &__icon {
    flex-shrink: 0;

    #{$size-xs} & {
      width: 12px;
      height: 12px;
    }

    #{$size-sm} & {
      width: 16px;
      height: 16px;
      margin-inline: -#{$space-05};
    }

    #{$size-md} & {
      width: 16px;
      height: 16px;
      margin-inline: -#{$space-1};
    }

    #{$size-lg} & {
      width: 20px;
      height: 20px;
      margin-inline: -#{$space-2};
    }

    #{$icon-trailing} & {
      order: 2;
    }
  }

  &__slot {
    order: 1;
    white-space: nowrap;

    @include text(regular, base);
  }

  &__close {
    cursor: pointer;
    order: 9;
    transition: $blur-duration-sm;

    #{$size-xs} & {
      width: 14px;
      height: 14px;
    }

    #{$size-sm} & {
      width: 16px;
      height: 16px;
      margin-inline: -#{$space-05};
    }

    #{$size-md} & {
      width: 20px;
      height: 20px;
      margin-inline: -#{$space-1};
    }

    #{$size-lg} & {
      width: 24px;
      height: 24px;
      margin-inline: -#{$space-2};
    }

    &:hover {
      filter: opacity(.8);
      transition: $hover-duration-sm;
    }

    &:active {
      transform: scale(.9);
      transition: $active-duration-sm;
    }
  }

  &:disabled {
    pointer-events: none;
  }
}
</style>
