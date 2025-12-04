<script lang="ts" setup>
import type { AnchorHTMLAttributes } from 'vue'
import type { IconProps } from './Icon.vue'

interface Props {
  variant?: 'filled' | 'lined' | 'nofilled'
  icon?: IconProps['name']
  size?: '3xs' | 'xxs' | 'xs' | 'sm' | 'md'
  color?: 'primary' | 'white' | 'lighter' | 'darker'
  type?: 'button' | 'submit' | 'reset'
  // TODO: типы из router, чтобы тут затипизированы только реальные роуты
  to?: string
  target?: AnchorHTMLAttributes['target']
  value?: string | number
  trailingIcon?: boolean
  disabled?: boolean
  active?: boolean
  loading?: boolean
}

const slots = useSlots()

const props = withDefaults(defineProps<Props>(), {
  variant: 'filled',
  size: 'md',
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
  $btn-color-primary: $this + '-color-primary';
  $btn-color-white: $this + '-color-white';
  $btn-color-lighter: $this + '-color-lighter';
  $btn-color-darker: $this + '-color-darker';

  ///
  $size-3xs: $this + '-size-3xs';
  $size-xxs: $this + '-size-xxs';
  $size-xs: $this + '-size-xs';
  $size-sm: $this + '-size-sm';
  $size-md: $this + '-size-md';
  $trailing-icon: $this + '-trailing-icon';
  $disabled: & + '-disabled';
  $loading: & + '-loading';
  $without-slot: & + '-without-slot';

  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: space-between;

  width: fit-content;
  border-radius: 39px;

  &#{$size-3xs} {
    height: 20px;
  }

  &#{$size-xxs} {
    height: 24px;
  }

  &#{$size-xs} {
    height: 32px;
  }

  &#{$size-sm} {
    gap: $space-4;
    height: 40px;
    padding: $space-2 $space-6;
    font-size: 14px;
  }

  &#{$size-md} {
    gap: $space-4;
    height: 48px;
    padding: $space-3 $space-6;
    font-size: 16px;
  }

  &#{$variant-filled} {
    --variant-filled-text-color: inherit;

    border: none !important;
    color: var(--variant-filled-text-color) !important;
    background-color: transparent;
  }

  &#{$variant-lined} {
    border: 1px solid transparent;
    background-color: transparent !important;
  }

  &#{$variant-nofilled} {
    border: none !important;
    background-color: transparent !important;
  }

  &#{$btn-color-primary} {
    --variant-filled-text-color: white;

    border-color: #{$color-primary};
    color: $color-primary;
    background-color: #{$color-primary};

    &:hover {
      border-color: #{$color-primary-600};
      background-color: #{$color-primary-600};
    }

    &:active {
      border-color: #{$color-primary-700};
      background-color: #{$color-primary-700};
    }

    &:disabled {
      --variant-filled-text-color: #{$color-neutral-light-400};

      border-color: #{$color-neutral-light-100};
      background-color: #{$color-neutral-light-100};
    }
  }

  &#{$btn-color-white} {
    --variant-filled-text-color: $color-neutral-light-950;

    border-color: white;
    color: white;
    background-color: white;

    &:hover {
      border-color: #{$color-neutral-light-200};
      color: #{$color-neutral-light-200};
      background-color: #{$color-neutral-light-200};
    }

    &:active {
      border-color: #{$color-neutral-light-400};
      color: #{$color-neutral-light-400};
      background-color: #{$color-neutral-light-400};
    }

    &:disabled {
      --variant-filled-text-color: #{$color-neutral-light-400};

      border-color: #{$color-neutral-light-100};
      background-color: #{$color-neutral-light-100};
    }

    // --btn-base: white;
    // --btn-hover: #{$color-neutral-light-200};
    // --btn-active: #{$color-neutral-light-400};
    // --btn-text-base: #{$color-neutral-light-950};
    // --btn-text-disabled: #{$color-neutral-light-400};
  }

  &#{$btn-color-lighter} {
    --variant-filled-text-color: $color-neutral-light-950;

    border-color: $color-neutral-light-100;
    color: $color-neutral-light-100;
    background-color: $color-neutral-light-100;

    &:hover {
      border-color: #{$color-neutral-light-300};
      color: #{$color-neutral-light-300};
      background-color: #{$color-neutral-light-300};
    }

    &:active {
      border-color: #{$color-neutral-light-400};
      color: #{$color-neutral-light-400};
      background-color: #{$color-neutral-light-400};
    }

    &:disabled {
      --variant-filled-text-color: #{$color-neutral-light-400};

      border-color: #{$color-neutral-light-100};
      background-color: #{$color-neutral-light-100};
    }

    // --btn-base: #{$color-neutral-light-100};
    // --btn-hover: #{$color-neutral-light-300};
    // --btn-active: #{$color-neutral-light-400};
    // --btn-text-base: #{$color-neutral-light-950};
    // --btn-text-disabled: #{$color-neutral-light-400};
  }

  &#{$btn-color-darker} {
    --variant-filled-text-color: white;

    border-color: $color-neutral-dark-500;
    color: $color-neutral-dark-500;
    background-color: $color-neutral-dark-500;

    &:hover {
      border-color: #{$color-neutral-light-400};
      color: #{$color-neutral-light-400};
      background-color: #{$color-neutral-light-400};
    }

    &:active {
      border-color: #{$color-neutral-light-300};
      color: #{$color-neutral-light-300};
      background-color: #{$color-neutral-light-300};
    }

    &:disabled {
      --variant-filled-text-color: #{$color-neutral-light-400};

      border-color: #{$color-neutral-light-100};
      background-color: #{$color-neutral-light-100};
    }

    // --btn-base: #{$color-neutral-dark-500};
    // --btn-hover: #{$color-neutral-dark-400};
    // --btn-active: #{$color-neutral-dark-300};
    // --btn-text-base: white;
    // --btn-text-disabled: #{$color-neutral-light-400};
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
  }

  &__slot:empty {
    display: none;
  }
}
</style>
