<script lang="ts" setup>
import type { AnchorHTMLAttributes } from 'vue'
import type { IconProps } from './Icon.vue'

interface Props {
  variant?: 'filled' | 'lined' | 'nofilled'
  icon?: IconProps['name']
  size?: 'xs' | 'sm' | 'md' | 'lg'
  color?: | 'white' | 'neutral' | 'primary'
  type?: 'button' | 'submit' | 'reset'
  // TODO: типы из router, чтобы тут затипизированы только реальные роуты
  to?: string
  target?: AnchorHTMLAttributes['target']
  value?: string | number
  trailingIcon?: boolean
  disabled?: boolean
  rounded?: boolean
  active?: boolean
  loading?: boolean
}

const slots = useSlots()

const props = withDefaults(defineProps<Props>(), {
  variant: 'filled',
  size: 'md',
  rounded: true,
  color: 'primary',
  type: 'button',
})

const tag = computed(() =>
  props.to ? 'a' : 'button',
)

const isIconVisible = computed(() =>
  props.icon || props.loading,
)

const iconName = computed(() =>
  props.loading ? 'change' : props.icon,
)

const classname = computed(() => [
  'button',
  `button-variant-${props.variant}`,
  `button-color-${props.color}`,
  `button-size-${props.size}`,
  { 'button-trailing-icon': props.trailingIcon },
  { 'button-disabled': props.disabled },
  { 'button-active': props.active },
  { 'button-rounded': props.rounded },
  { 'button-loading': props.loading },
  { 'button-without-slot': !slots.default },
])

export type { Props as ButtonProps }
</script>

<template>
  <component
    :is="tag"
    :href="to"
    :class="classname"
    :type
    :to
    :value
    :disabled
  >
    <AppIcon
      v-if="isIconVisible"
      class="button__icon"
      :name="iconName!"
    />
    <span
      class="button__slot"
    >
      <slot />
    </span>
  </component>
</template>

<style lang="scss">
.button {
  $this: &;
  $hover: & + ':hover';
  $active: '&.button:active, &.button-active';

  ///
  $variant-filled: $this + '-variant-filled';
  $variant-lined: $this + '-variant-lined';
  $variant-nofilled: $this + '-variant-nofilled';

  ///
  $primary-color: $this + '-color-primary';
  $white-color: $this + '-color-white';
  $neutral-color: $this + '-color-neutral';

  ///
  $size-3xs: $this + '-size-3xs';
  $size-xxs: $this + '-size-xxs';
  $size-xs: $this + '-size-xs';
  $size-sm: $this + '-size-sm';
  $size-md: $this + '-size-md';
  $size-lg: $this + '-size-lg';
  $trailing-icon: $this + '-trailing-icon';
  $disabled: & + '-disabled';
  $rounded: & + '-rounded';
  $loading: & + '-loading';
  $without-slot: & + '-without-slot';

  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: space-between;

  width: fit-content;

  transition: $blur-duration-sm;

  &:hover {
    transition: $hover-duration-sm;
  }

  &:active {
    transition: $active-duration-sm;
  }

  &#{$rounded} {
    border-radius: 50px !important;
  }

  &#{$size-xs} {
    gap: $space-2;
    height: 32px;
    padding-inline: $space-3;
    border-radius: $radius-2;

    @include text(regular, xs);
  }

  &#{$size-sm} {
    gap: $space-3;
    height: 40px;
    padding-inline: $space-4;
    border-radius: $radius-2;

    @include text(regular, sm);
  }

  &#{$size-md} {
    gap: $space-4;
    height: 48px;
    padding-inline: $space-5;
    border-radius: $radius-2;

    @include text(regular, md);
  }

  &#{$size-lg} {
    gap: $space-5;
    height: 56px;
    padding-inline: $space-6;
    border-radius: $radius-3;

    @include text(regular, md);
  }

  &#{$variant-filled} {
    --variant-filled-text-color: inherit;

    border: none !important;
    color: var(--variant-filled-text-color) !important;
    background-color: transparent;
  }

  &#{$variant-lined} {
    --variant-lined-background-color: inherit;
    --variant-lined-text-color: unset;

    border: 1px solid transparent;
    color: var(--variant-lined-text-color) !important;
    background-color: var(--variant-lined-background-color) !important;
  }

  &#{$variant-nofilled} {
    --variant-nofilled-background-color: inherit;

    border: none !important;
    background-color: var(--variant-nofilled-background-color) !important;
  }

  &#{$primary-color} {
    --variant-filled-text-color: white;
    --variant-nofilled-background-color: transparent;
    --variant-lined-text-color: #{$color-primary};

    border-color: $color-primary;
    color: $color-primary;
    background-color: $color-primary;

    &:hover {
      --variant-nofilled-background-color: #{$color-primary-100};
      --variant-lined-background-color: #{$color-primary-100};

      border-color: $color-primary-600;
      background-color: $color-primary-600;
    }

    &:active {
      border-color: #{$color-primary-700};
      background-color: #{$color-primary-700};
    }
  }

  &#{$white-color} {
    --variant-filled-text-color: $color-neutral-light-950;
    --variant-lined-text-color: white;

    border-color: white;
    color: white;
    background-color: white;

    &:hover {
      --variant-nofilled-background-color: white;
      --variant-lined-background-color: white;
      --variant-lined-text-color: #{$color-neutral-light-950};

      border-color: #{$color-neutral-light-50};
      color: #{$color-neutral-light-950};
      background-color: #{$color-neutral-light-100};
    }

    &:active {
      --variant-nofilled-background-color: #{$color-neutral-light-100};
      --variant-lined-background-color: #{$color-neutral-light-100};

      border-color: #{$color-neutral-light-150};
      color: #{$color-neutral-light-950};
      background-color: #{$color-neutral-light-150};
    }
  }

  &#{$neutral-color} {
    --variant-filled-text-color: $color-neutral-light-950;
    --variant-lined-text-color: #{$color-neutral-light-950};

    border-color: $color-neutral-light-300;
    color: $color-neutral-light-300;
    background-color: $color-neutral-light-100;

    &:hover {
      --variant-nofilled-background-color: #{$color-neutral-light-100};
      --variant-lined-background-color: #{$color-neutral-light-100};

      transform: $hover-duration-sm;
      border-color: $color-neutral-light-400;
      background-color: $color-neutral-light-150;
    }

    &:active {
      transform: $active-duration-sm;
      border-color: $color-neutral-light-500;
      background-color: $color-neutral-light-200;
    }
  }

  &#{$trailing-icon} {
    flex-direction: row-reverse;
  }

  &#{$disabled} {
    pointer-events: none;
    cursor: not-allowed;
    color: $color-neutral-light-300;
  }

  &#{$loading} {
    pointer-events: none;
    cursor: progress;

    // &#{$this}__icon {
    //   animation: rotate 1s linear infinite;
    // }
  }

  &#{$without-slot} {
    justify-content: center;
    aspect-ratio: 1;
    padding: 0;
  }

  // TODO(YURA)
  &__icon {
    // если loading state => rotate animation из https://animate.style
    // в app/assets/scss/design-system/animation.scss добавми
    // как в leadsale

    #{$size-xs} & {
      width: 16px;
      height: 16px;
      margin-inline: -#{$space-05};
    }

    #{$size-sm} & {
      width: 20px;
      height: 20px;
      margin-inline: -#{$space-1};
    }

    #{$size-md} & {
      width: 24px;
      height: 24px;
      margin-inline: -#{$space-2};
    }

    #{$size-lg} & {
      width: 28px;
      height: 28px;
      margin-inline: -#{$space-3};
    }
  }

  &__slot:empty {
    display: none;
  }
}
</style>
