<script lang="ts" setup>
interface Props {
  variant?: 'filled' | 'lined' | 'nofilled'
  // После создания AppIcon;
  icon?: IconProps['name']
  size?: '3xs' | 'xxs' | 'xs' | 'sm' | 'md'
  color?: 'primary' | 'neutral-0' | 'neutral-1' | 'neutral-1-20'
  type?: 'button' | 'submit' | 'reset'
  // TODO типы из router, чтобы тут затипизированы были только реальные роуты
  // А если ссылка на внешний ресурс? Может тогда ещё проп target добавить?
  to?: string
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
  $color-primary-1: $this + '-color-primary';
  $color-neutral-0: $this + '-color-neutral-0';
  $color-neutral-1: $this + '-color-neutral-1';
  $color-neutral-1-20: $this + '-color-neutral-1-20';
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

  &#{$variant-filled} {
    &#{$color-primary-1} {
      color: $color-neutral-light-0;
      background-color: $color-primary;

      &:not(#{$disabled}):not(#{$loading})#{$hover} {
        background-color: $color-primary-600;
      }

      &:not(#{$disabled}):not(#{$loading})#{$active},
      &:not(#{$disabled}):not(#{$loading})#{$active-from-props} {
        color: $color-neutral-light-400;
        background-color: $color-primary-700;
      }

      &#{$disabled} {
        color: $color-neutral-light-400;
        background-color: $color-neutral-light-100;
      }
    }

    &#{$color-neutral-0} {
      color: $color-neutral-light-950;
      background-color: $color-neutral-light-0;

      &:not(#{$disabled}):not(#{$loading})#{$hover} {
        background-color: $color-neutral-light-200;
      }

      &:not(#{$disabled}):not(#{$loading})#{$active},
      &:not(#{$disabled}):not(#{$loading})#{$active-from-props} {
        background-color: $color-neutral-light-400;
      }
    }

    &#{$color-neutral-1} {
      color: $color-neutral-light-950;
      background-color: $color-neutral-light-100;

      &:not(#{$disabled}):not(#{$loading})#{$hover} {
        background-color: $color-neutral-light-300;
      }

      &:not(#{$disabled}):not(#{$loading})#{$active},
      &:not(#{$disabled}):not(#{$loading})#{$active-from-props} {
        background-color: $color-neutral-light-400;
      }
    }

    &#{$color-neutral-1-20} {
      color: $color-neutral-light-0;
      background-color: rgba($color-neutral-light, 0.2);

      &:not(#{$disabled}):not(#{$loading})#{$hover} {
        background-color: rgba($color-neutral-light, 0.4);
      }

      &:not(#{$disabled}):not(#{$loading})#{$active},
      &:not(#{$disabled}):not(#{$loading})#{$active-from-props} {
        background-color: rgba($color-neutral-light, 0.8);
      }
    }
  }

  &#{$variant-lined} {
    border: 1px solid $color-neutral-light-300;
    color: $color-neutral-light-950;
    background-color: unset;

    &:not(#{$disabled}):not(#{$loading})#{$hover} {
      background-color: $color-neutral-light-0;
    }
    &:not(#{$disabled}):not(#{$loading})#{$active},
    &:not(#{$disabled}):not(#{$loading})#{$active-from-props} {
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
    padding: $space-1;

    &:not(#{$disabled}):not(#{$loading})#{$hover} {
      color: $color-neutral-light-900;
    }

    &:not(#{$disabled}):not(#{$loading})#{$active},
    &:not(#{$disabled}):not(#{$loading})#{$active-from-props} {
      color: $color-neutral-light-600;
    }

    &#{$disabled} {
      color: $color-neutral-light-300;
    }
  }

  &#{$trailing-icon} {
    flex-direction: row-reverse;
  }

  &#{$disabled} {
    cursor: not-allowed;
    color: $color-neutral-light-300;
  }

  &#{$loading} {
    cursor: progress;
  }

  &#{$no-text} {
    justify-content: center;
    aspect-ratio: 1;
    padding: 0;
  }
}
</style>
