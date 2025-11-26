<script lang="ts" setup>
import type { AnchorHTMLAttributes } from 'vue'
import type { IconProps } from './Icon.vue'

interface Props {
  variant?: 'filled' | 'lined' | 'nofilled'
  icon?: IconProps['name']
  size?: '3xs' | 'xxs' | 'xs' | 'sm' | 'md'
  // TODO(YURA): да, согл с тобой по цветам, давай использовать схему 'primary' | 'white' | 'lighter' | 'darker'
  //             визуально в макете синий есть, белый, и серый, с темно серым соотвественно
  //
  //             Например, если variant=lined/color=primary, то бордер заливаем цветом
  //             если variant=nofilled/color=primary, то содержимое – текст и/или иконку
  //             Это отходит от того, что сделали дизайнеры, но с точки дизайн-системы, которую мы хотим построить, это корректно
  //             После подрубим сторибук, и там будет показательно, что макетная реализация некорректна
  //
  //             ⚠️ Убедись, что смотришь в последней версии макета, а не в своей копии, а то есть такое ощущение чет
  //
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

// когда передан loading меняем/добавдяем иконке name = иконке загрузке
// isIconVisible = computed(
// iconName = computed(

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
    <!--
      isIconVisible
      iconName
    -->
    <AppIcon
      v-if="icon || loading"
      class="button__icon"
      :icon="loading ? 'loading' : icon"
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
  $active: & + ':active' + ', ' + & + '-active';

  // TODO(YURA): ⬆️ как то так давай
  // $active-from-props: & + '-active';
  $variant-filled: $this + '-variant-filled';
  $variant-lined: $this + '-variant-lined';
  $variant-nofilled: $this + '-variant-nofilled';
  $active-from-props: '';

  // TODO(YURA): Замена на нашу новую схему
  $color-primary-1: $this + '-color-primary';
  $color-neutral-0: $this + '-color-neutral-0';
  $color-neutral-1: $this + '-color-neutral-1';
  $color-neutral-1-20: $this + '-color-neutral-1-20';
  $color-tab-filled: $this + '-color-tab-filled';
  $color-tab-nofilled: $this + '-color-tab-nofilled';
  $color-tab-lined: $this + '-color-tab-lined';

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

  // TODO(YURA): пустые строки между правилами
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

  // TODO(YURA): цвет не вкладываем, а задаем вне варианта
  //  есть пример в AppInput. Ховеры меняющие цвет тоже в $color-...
  //
  // &#{$color-primary} {
  //  background-color: $color-primary;
  //  border-color: $color-primary;
  //  color: $color-primary;
  //
  //  &:hover {
  //    background-color: $color-primary-100;
  //    border-color: $color-primary-100;
  //    color: $color-primary-100;
  //  }
  // }
  // Ну и в самих вариантах, запрещаем/разрешаем/назначаем border/background-color/color через !important
  // Так же есть пример в AppInput
  &#{$variant-filled} {
    &#{$color-primary-1} {
      color: white;
      background-color: $color-primary;

      &#{$hover} {
        background-color: $color-primary-600;
      }

      &#{$active},
      #{$active-from-props} {
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
      background-color: white;

      &#{$hover} {
        background-color: $color-neutral-light-200;
      }

      &#{$active},
      #{$active-from-props} {
        background-color: $color-neutral-light-400;
      }
    }

    &#{$color-neutral-1} {
      color: $color-neutral-light-950;
      background-color: $color-neutral-light-100;

      &#{$hover} {
        background-color: $color-neutral-light-300;
      }

      &#{$active},
      #{$active-from-props} {
        background-color: $color-neutral-light-400;
      }
    }

    &#{$color-neutral-1-20} {
      color: white;
      background-color: rgba($color-neutral-light, 0.2);

      &#{$hover} {
        background-color: rgba($color-neutral-light, 0.4);
      }

      &#{$active},
      #{$active-from-props} {
        background-color: rgba($color-neutral-light, 0.8);
      }

      &#{$disabled} {
        color: $color-neutral-light-400;
      }
    }

    &#{$color-tab-filled} {
      border-radius: $radius-3;
      color: $color-neutral-light-950;
      background-color: $color-neutral-light-50;

      &#{$hover} {
        background-color: $color-neutral-light-200;
      }

      &#{$active} {
        background-color: $color-neutral-light-50;
      }

      &#{$active-from-props} {
        background-color: $color-neutral-light-200;
      }

      &#{$disabled} {
        color: $color-neutral-light-400;
      }
    }
  }

  &#{$variant-lined} {
    border: 1px solid $color-neutral-light-300;
    color: $color-neutral-light-950;
    background-color: unset;

    // TODO(YURA): пустые строки между правилами
    &#{$hover} {
      background-color: white;
    }
    &#{$active},
    #{$active-from-props} {
      color: $color-neutral-light-950;
      background-color: $color-neutral-light-50;
    }

    &#{$disabled} {
      color: $color-neutral-light-300;
    }

    &#{$color-tab-lined} {
      border: 1px solid $color-neutral-light-300;
      color: $color-neutral-light-950;

      &#{$hover} {
        background-color: white;
      }

      &#{$active} {
        background-color: $color-neutral-light-200;
      }

      &#{$active-from-props} {
        background-color: white;
      }

      &#{$disabled} {
        color: $color-neutral-light-400;
      }
    }
  }

  &#{$variant-nofilled} {
    padding: $space-1;
    color: $color-neutral-light-200;
    background-color: unset;

    &#{$hover} {
      color: $color-neutral-light-50;
    }

    &#{$active},
    #{$active-from-props} {
      color: $color-neutral-light-300;
    }

    &#{$disabled} {
      color: $color-neutral-light-400;
    }

    &#{$color-tab-nofilled} {
      border: none;
      color: $color-neutral-light-500;

      &#{$hover} {
        color: $color-neutral-light-950;
        text-decoration: underline;
      }

      &#{$active} {
        color: $color-neutral-light-900;
        text-decoration: underline;
      }

      &#{$active-from-props} {
        color: $color-neutral-light-950;
        text-decoration: underline;
      }

      &#{$disabled} {
        color: $color-neutral-light-300;
        text-decoration: underline;
      }
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
