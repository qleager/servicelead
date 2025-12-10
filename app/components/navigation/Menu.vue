<script lang="ts" setup>
import type { IconProps } from '../App/Icon.vue'

interface Props {
  items: Item[]
  title?: string
  minimal?: boolean
}

interface Item {
  icon: IconProps['name']
  label: string
  // TODO навигация - сделать типы из router, чтобы тут затипизированы были только реальные роуты
  to?: string
  onClick: () => void
}

// INFO: убрали композиции роутинга (как отслеживать текущую страницу будет ниже)

const props = defineProps<Props>()

const classname = computed(() => [
  'navigation-menu',
  // INFO: замена на minimal
  { 'navigation-menu-minimal': props.minimal },
])

// INFO: упростили computed
const titleText = computed(() => props.minimal && props.title ? '--------' : props.title)

// INFO: убрали обработчик клика (как отслеживать текущую страницу будет ниже)

export type { Item as NavigationMenuItem }
</script>

<template>
  <div :class="classname">
    <div class="navigation-menu__title">
      {{ titleText }}
    </div>
    <div class="navigation-menu__list">
      <!-- INFO: заменили на NuxtLink (чтобы как раз отслеживать текущую страницу)
                 код стал сильно чище: избавились от композиций, обработчиков клика, добавки классов
      -->
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
    padding: $space-3 0 $space-3 $space-10;
    font-weight: 600;
    color: $color-neutral-light-500;

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

      color: $color-neutral-light-500;
      text-decoration: none;

      &:hover {
        color: inherit;
      }

      &#{$active} {
        pointer-events: none;

        border-left: 4px solid $color-primary-500;
        border-radius: 0 $space-20 $space-20 0;

        color: $color-neutral-light-950;

        background-color: rgba($color-primary-300, 40%);
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
