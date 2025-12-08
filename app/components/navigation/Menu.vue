<script lang="ts" setup>
import type { IconProps } from '../App/Icon.vue'
import type { ButtonProps } from '../App/Button.vue'

interface Props {
  items: Item[]
  title?: string
  minimal?: boolean
  size?: ButtonProps['size']
}

interface Item {
  icon: IconProps['name']
  label: string
  // TODO навигация - сделать типы из router, чтобы тут затипизированы были только реальные роуты
  to?: string
  onClick: () => void
}

const router = useRouter()
const route = useRoute()

const props = defineProps<Props>()

const classname = computed(() => [
  'navigation-menu',
  { 'navigation-menu--collapsed': props.minimal },
])

const titleText = computed(() => {
  if (!props.title) return ''
  return props.minimal ? '---------' : props.title
})

const isActive = (item: Item) => {
  if (!item.to) return false
  return route.path.startsWith(item.to)
}

const handleClick = (item: Item) => {
  if (item.to) router.push(item.to)
  item.onClick?.()
}

export type { Item as NavigationMenuItem }
</script>

<template>
  <div :class="classname">
    <div class="navigation-menu__title">
      {{ titleText }}
    </div>
    <div class="navigation-menu__list">
      <div
        v-for="item in items"
        :key="item.label"
        :class="[
          'navigation-menu__item',
          { 'navigation-menu__item--active': isActive(item) },
          { 'navigation-menu__item--add-item': item.label === 'Добавить пункт меню' },
        ]"
        @click="handleClick(item)"
      >
        <div
          class="navigation-menu__item-button"
          @click="handleClick(item)"
        >
          <AppIcon
            class="navigation-menu__item-icon"
            :name="item.icon"
          />
          <template v-if="!minimal">
            <div>
              {{ item.label }}
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.navigation-menu {
  $this: &;
  $button: '.button';

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &__title {
    @include text(semibold, xs);

    padding: $space-3 0 $space-3 $space-10;
    font-weight: 600;
    color: #9AA0A6;
    text-transform: uppercase;

    &:empty {
      display: none;
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: $space-1;
    width: 100%;
  }

  &__item {
    max-width: 100%;
    padding: 0 0 0 $space-10;
    color: $color-neutral-light-500;

    &-button {
      cursor: pointer;

      display: flex;
      gap: $space-4;
      align-items: center;
      justify-content: flex-start;

      height: 48px;
    }

    &--add-item {
      @include text(semibold, sm);

      width: 226px;
      height: 56px;
      margin: $space-2 0 $space-2 $space-6;
      padding: $space-1;
      border: 1px dashed $color-neutral-light-300;
      border-radius: $space-20;

      #{$this} {
        &__item {
          &-button {
            gap: $space-2;
          }

          &-icon {
            width: 48px;
            height: 48px;
            padding: $space-3;
            border-radius: 50%;

            background-color: $color-neutral-light-100;
          }
        }
      }
    }

    &--active {
      border-left: 4px solid $color-primary-500;
      border-radius: 0 $space-20 $space-20 0;
      color: $color-neutral-light-950;
      background-color: $color-neutral-light-200;
    }
  }

  &--collapsed {
    #{$this} {
      &__title {
        display: flex;
        align-items: center;
        justify-content: center;

        height: 40px;
        padding: 0 0 0 $space-6;

        text-align: center;

        &:empty {
          display: none;
        }
      }

      &__list {
        align-items: flex-start;
      }

      &__item {
        width: fit-content;
        padding: 0 $space-3 0 $space-6;

        &-button {
          justify-content: center;
          width: 48px;
        }

        &--add-item {
          margin: $space-2 0;
          padding-left: $space-6;
          border: none;

          #{$this} {
            &__item {
              &-icon {
                background-color: white;
              }
            }
          }
        }
      }
    }
  }
}
</style>
