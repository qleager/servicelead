<script lang="ts" setup>
import type { IconProps } from '../app/Icon.vue'

interface Props {
  items: Item[]
  title?: string
  minimal?: boolean
}

interface Item {
  icon: IconProps['name']
  label: string
  to: RouteTo<true>
  onClick: () => void
}

const props = defineProps<Props>()

const classname = computed(() => [
  'navigation-menu',
  { 'navigation-menu-minimal': props.minimal },
])

export type { Item as NavigationMenuItem }
</script>

<template>
  <div :class="classname">
    <div class="navigation-menu__title">
      {{ props.title }}
    </div>
    <div class="navigation-menu__list">
      <NuxtLink
        v-for="item in items"
        :key="item.label"
        :to="item.to"
        class="navigation-menu__list-item"
      >
        <AppIcon
          :name="item.icon"
          class="navigation-menu__list-item-icon"
        />
        <span class="navigation-menu__list-item-text">{{ item.label }}</span>
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="scss">
.navigation-menu {
  $this: &;
  $minimal: $this + '-minimal';

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &__title {
    pointer-events: none;
    user-select: none;

    padding: $space-3 0 $space-3 $space-10;

    font-weight: 600;
    color: $color-neutral;

    @include text(semibold, xs);

    text-transform: uppercase;

    &:empty {
      display: none;
    }

    #{$minimal} & {
      display: flex;
      align-items: center;
      justify-content: center;

      padding-left: $space-8;

      font-size: 0;
      text-align: center;

      &::before {
        content: '--------';
        font-size: 12px;
      }

      &:empty {
        display: none;
      }
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: $space-05;
    width: 100%;

    #{$minimal} & {
      align-items: flex-start;
    }

    &-item {
      $active: & + '.router-link-active';

      display: flex;
      gap: $space-6;

      max-width: 100%;
      padding-block: $space-3;
      padding-inline: $space-9 $space-4;
      border-left: $space-1 solid transparent;

      color: $color-neutral;
      text-decoration: none;

      transition: $blur-duration-sm;

      a[href=''],
      &:not([href]) {
        pointer-events: none;
        opacity: 0.5;
      }

      &#{$active} {
        pointer-events: none;

        border-left: 4px solid $color-primary;
        border-radius: 0 $space-20 $space-20 0;

        color: $color-neutral-950;

        background-color: rgba($color-primary-100, 40%);
      }

      #{$minimal} & {
        width: fit-content;
      }

      &:hover {
        color: inherit;
        transition: $hover-duration-sm;
      }

      &:active {
        color: inherit;
        transition: $active-duration-sm;
      }

      &-text {
        #{$minimal} & {
          display: none;
        }
      }
    }
  }
}
</style>
