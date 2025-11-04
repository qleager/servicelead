<script lang="ts" setup>
interface Props {
  variant?: 'filled' | 'lined' | 'nofiled'
  // После создания AppIcon
  icon?: IconProps['name']
  size?: '3xs' | 'xxs' | 'xs' | 'sm' | 'md'
  color?: 'primary' | 'neutral' | 'neutral-1'
  type?: 'button' | 'submit' | 'reset'
  // TODO типы из router, чтобы тут затипизированы были только реальные роуты
  // а если ссылка на внешний ресурс? Может тогда ещё проп target добавить?
  to?: string
  value?: string | number
  trailingIcon?: boolean
  disabled?: boolean
  active?: boolean
  loading?: boolean
}

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

const slots = useSlots()

const componentTag = computed(() =>
  props.to ? 'a' : 'button',
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
    <!-- <AppIcon
      class="button__icon"
      :icon='loading ? 'loading' : icon'
    /> -->
    <div v-if="icon">
      {{ loading ? '...' : icon }}
    </div>
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
  $active: & + ':active';
  $active-from-props: & + '-active';
  $variant-filled: $this + '-variant-filled';
  $variant-lined: $this + '-variant-lined';
  $variant-nofilled: $this + '-variant-nofilled';
  $trailing-icon: $this + '-trailing-icon';
  $disabled: & + '-disabled';
  $loading: & + '-loading';
  $no-text: & + '-no-text';
  $size-3xs: $this + '-size-3xs';
  $size-xxs: $this + '-size-xxs';
  $size-xs: $this + '-size-xs';
  $size-sm: $this + '-size-sm';
  $size-md: $this + '-size-md';

  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: space-between;

  width: fit-content;
  border-radius: 39px;

  &#{$variant-filled} {
    color: $color-neutral-light-0;
    background-color: $color-primary;

    &#{$hover} {
      background-color: $color-primary-600;
    }

    &#{$active}, &#{$active-from-props} {
      color: $color-neutral-light-400;
      background-color: $color-primary-700;
    }

    &#{$disabled} {
      color: $color-neutral-light-50;
      background-color: $color-neutral-light-100;
    }
  }

  &#{$variant-lined} {
    border: 1px solid $color-neutral-light-300;
    color: $color-neutral-light-950;
    background-color: unset;

    &#{$hover} {
      background-color: $color-neutral-light-0;
    }
    &#{$active}, &#{$active-from-props} {
      color: $color-neutral-light-950;
      background-color: $color-neutral-light-50;
    }

    &#{$disabled} {
      color: $color-neutral-light-300;
    }
  }

  &#{$variant-nofilled} {
    color: $color-neutral-light;
    background-color: unset;

    &#{$hover} {
      color: $color-neutral-light-900;
    }

    &#{$active}, &#{$active-from-props} {
      color: $color-neutral-light-600;
    }

    &#{$disabled} {
      color: $color-neutral-light-300;
    }
  }

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
    padding: $space-4 $space-6;
    font-size: 16px;
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
}
</style>
