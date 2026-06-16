<script lang="ts" setup>
import type { Size } from '~/types/ds'
import type { ChipProps } from './Chip.vue'
import type { IconProps } from './Icon.vue'

interface Props {
  alt?: string
  chip?: ChipProps | boolean
  icon?: IconProps['name']
  size?: Size
  src?: string
  text?: string
}

const AppChip = resolveComponent('AppChip')

const props = withDefaults(defineProps<Props>(), {
  icon: 'main_menu_account',
  size: 'md',
})

const classname = computed(() => ([
  'avatar',
  `avatar-size-${props.size}`,
]))

const rootElement = computed(() => props.chip ? AppChip : 'div')

const chipBind = computed<ChipProps | null>(() => {
  if (!props.chip) {
    return null
  }

  return {
    size: props.size,
    inset: true,
    ...(typeof props.chip === 'object' ? props.chip : {}),
  }
})

const fallback = computed(() => props.text || props.alt?.trim().split(' ').map(word => word.charAt(0)).join('').substring(0, 2))
</script>

<template>
  <component
    :is="rootElement"
    v-bind="chipBind"
    :class="classname"
  >
    <NuxtImg
      v-if="src"
      :alt
      class="avatar__image"
      :src
    />
    <div
      v-else
      class="avatar__fallback"
    >
      <span
        v-if="fallback"
        class="avatar__fallback-text"
      >
        {{ fallback }}
      </span>
      <AppIcon
        v-else
        class="avatar__icon"
        :name="icon"
      />
    </div>
  </component>
</template>

<style lang="scss">
.avatar {
  $this: &;

  ///
  $size-3xs: $this + '-size-3xs';
  $size-2xs: $this + '-size-2xs';
  $size-xs: $this + '-size-xs';
  $size-sm: $this + '-size-sm';
  $size-md: $this + '-size-md';
  $size-lg: $this + '-size-lg';
  $size-xl: $this + '-size-xl';
  $size-2xl: $this + '-size-2xl';
  $size-3xl: $this + '-size-3xl';

  display: flex;
  align-items: center;
  justify-content: center;

  @include is($size-3xs) {
    width: 16px;
    height: 16px;
  }

  @include is($size-2xs) {
    width: 20px;
    height: 20px;
  }

  @include is($size-xs) {
    width: 24px;
    height: 24px;
  }

  @include is($size-sm) {
    width: 28px;
    height: 28px;
  }

  @include is($size-md) {
    width: 32px;
    height: 32px;
  }

  @include is($size-lg) {
    width: 36px;
    height: 36px;
  }

  @include is($size-xl) {
    width: 40px;
    height: 40px;
  }

  @include is($size-2xl) {
    width: 44px;
    height: 44px;
  }

  @include is($size-3xl) {
    width: 48px;
    height: 48px;
  }

  &__image {
    width: 100%;
    height: 100%;
    border-radius: 50px;

    object-fit: cover;
    object-position: center;
  }

  &__icon {
    display: flex;
    color: $color-neutral;

    @include is($size-3xs) {
      width: 8px;
      height: 8px;
    }

    @include is($size-2xs) {
      width: 10px;
      height: 10px;
    }

    @include is($size-xs) {
      width: 12px;
      height: 12px;
    }

    @include is($size-sm) {
      width: 14px;
      height: 14px;
    }

    @include is($size-md) {
      width: 16px;
      height: 16px;
    }

    @include is($size-lg) {
      width: 18px;
      height: 18px;
    }

    @include is($size-xl) {
      width: 20px;
      height: 20px;
    }

    @include is($size-2xl) {
      width: 22px;
      height: 22px;
    }

    @include is($size-3xl) {
      width: 24px;
      height: 24px;
    }
  }

  &__fallback {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;
    border-radius: 50px;

    background-color: $color-neutral-100;

    @include is($size-3xs) {
      @include text(regular, 2xs);
    }

    @include is($size-2xs) {
      @include text(regular, 2xs);
    }

    @include is($size-xs) {
      @include text(regular, 2xs);
    }

    @include is($size-sm) {
      @include text(regular, xs);
    }

    @include is($size-md) {
      @include text(regular, xs);
    }

    @include is($size-lg) {
      @include text(regular, sm);
    }

    @include is($size-xl) {
      @include text(regular, md);
    }

    @include is($size-2xl) {
      @include text(regular, lg);
    }

    @include is($size-3xl) {
      @include text(regular, xl);
    }

    &-text {
      position: relative;
      overflow: hidden;
      color: $color-neutral-400;
      text-overflow: ellipsis;
    }
  }
}
</style>
