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
  trailingIcon: false,
  disabled: false,
  active: false,
  loading: false,
})

const componentTag = computed(() =>
  props.to ? 'a' : 'button',
)

const isIconVisible = computed(() =>
  props.icon || props.loading
)

const iconName = computed(() => 
  props.loading ? 'loading' : props.icon
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
  { 'button-no-text': !slots.default },
])

export type { Props as ButtonProps }
</script>

<template>
  <component
    :is="componentTag"
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
      v-if="$slots.default"
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
  $no-text: & + '-no-text';

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
    border: transparent;
    color: var(--btn-text-base);
    background-color: var(--btn-base);

    &:hover {
      background-color: var(--btn-hover);
    }
    
    #{$active} {
      background-color: var(--btn-active);
    }

    &:disabled {
      background-color: var(--btn-text-disabled);
    }
  }

  &#{$variant-lined} {
    border: 1px solid var(--btn-base);
    color: var(--btn-text-base);
    background-color:  transparent;

    &:hover {
      background-color: var(--btn-hover);
    }
    
    #{$active} {
      background-color: var(--btn-active);
    }

    &:disabled {
      color: var(--btn-text-disabled);
    }
  }

  &#{$variant-nofilled} {
    border: transparent;
    color: var(--btn-base);
    background-color:  transparent;
    
    &:hover {
      color: var(--btn-hover);
    }
    
    #{$active} {
      color: var(--btn-active);
    }

    &:disabled {
      color: var(--btn-text-disabled);
    }
  }

  &#{$btn-color-primary} {
    --btn-base: #{$color-primary};
    --btn-hover: #{$color-primary-600};
    --btn-active: #{$color-primary-700};
    --btn-text-base: #{$color-neutral-light-100};
    --btn-text-disabled: #{$color-neutral-light-400};
  }

  &#{$btn-color-white} {
    --btn-base: white;
    --btn-hover: #{$color-neutral-light-200};
    --btn-active: #{$color-neutral-light-400};
    --btn-text-base: #{$color-neutral-light-950};
    --btn-text-disabled: #{$color-neutral-light-400};
  }

  &#{$btn-color-lighter} {
    --btn-base: #{$color-neutral-light-100};
    --btn-hover: #{$color-neutral-light-300};
    --btn-active: #{$color-neutral-light-400};
    --btn-text-base: #{$color-neutral-light-950};
    --btn-text-disabled: #{$color-neutral-light-400};
  }

  &#{$btn-color-darker} {
    --btn-base: #{$color-neutral-dark-500};
    --btn-hover: #{$color-neutral-dark-400};
    --btn-active: #{$color-neutral-dark-300};
    --btn-text-base: white;
    --btn-text-disabled: #{$color-neutral-light-400};
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
  }

  &#{$no-text} {
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
}
</style>
