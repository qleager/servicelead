<script lang="ts" setup>
import type { IconProps } from '../app/Icon.vue'
import type { RouteTo } from '@shared/types/router.ts'

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

// Todo-2: убираем и делаем через ::before (см todo-2.1)
const titleText = computed(() => props.minimal && props.title ? '--------' : props.title)

export type { Item as NavigationMenuItem }
</script>

<template>
  <div :class="classname">
    <div class="navigation-menu__title">
      {{ titleText }}
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

    // TODO-5: просто color-neutral -- 500 цвет - это дефолт цвет палитры
    color: $color-neutral-500;

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

      text-align: center;

      // todo-2.1
      // font-size: 0px

      // &::before {
      //   content: '-----'
      //   font-size: 16px или сколько там
      // }

      &:empty {
        display: none;
      }
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 2px;
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
      padding-inline: $space-10 $space-4;

      // TODO-1: просто color-neutral -- 500 цвет - это дефолт цвет палитры
      color: $color-neutral-500;
      text-decoration: none;

      &:hover {
        color: inherit;
      }

      &#{$active} {
        pointer-events: none;

        // TODO-4: просто color-primary -- 500 цвет - это дефолт цвет палитры
        border-left: 4px solid $color-primary-500;
        border-radius: 0 $space-20 $space-20 0;

        color: $color-neutral-950;

        background-color: rgba($color-primary-100, 40%);
      }

      #{$minimal} & {
        width: fit-content;
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
