<script lang="ts" setup>
import type { NavigationMenuItem } from './Menu.vue'

interface Props {
  minimal?: boolean
}

const props = defineProps<Props>()

const mainItems: NavigationMenuItem[] = [
  { icon: 'main_menu_main', label: 'Главная', to: '/dashboard', onClick: () => {} },
  { icon: 'main_menu_offer', label: 'Офферы', to: '/offers', onClick: () => {} },
  { icon: 'main_menu_flows', label: 'Потоки', to: '/threads', onClick: () => {} },
  { icon: 'main_menu_money', label: 'Финансы', to: '', onClick: () => {} },
  { icon: 'main_menu_statistic', label: 'Статистика', to: '/statistics', onClick: () => {} },
  { icon: 'main_menu_tools', label: 'Инструменты', to: '', onClick: () => {} },
]

const helpItems: NavigationMenuItem[] = [
  { icon: 'main_menu_help', label: 'Справка', to: '', onClick: () => {} },
  { icon: 'main_menu_tickets', label: 'Тикеты', to: '/tickets', onClick: () => {} },
  { icon: 'main_menu_doc_API', label: 'Документация API', to: '', onClick: () => {} },
  { icon: 'main_menu_account', label: 'Личный кабинет', to: '', onClick: () => {} },
]

const classname = computed(() => [
  'navigation',
  { 'navigation-minimal': props.minimal },
])
</script>

<template>
  <nav :class="classname">
    <NavigationMenu
      :items="mainItems"
      :minimal
    />
    <NavigationMenu
      :items="helpItems"
      :minimal
      title="Помощь"
    />

    <button
      class="navigation__add-button"
      type="button"
    >
      <AppIcon
        class="navigation__add-button-icon"
        name="plus"
      />
      <div
        v-if="!minimal"
        class="navigation__add-button-text"
      >
        Добавить пункт меню
      </div>
    </button>
  </nav>
</template>

<style lang="scss">
.navigation {
  $this: &;
  $minimal: $this + '-minimal';

  &__add-button {
    cursor: pointer;

    display: flex;
    gap: $space-3;
    align-items: center;
    justify-content: flex-start;

    height: 56px;
    margin: $space-2;
    margin-left: $space-6;
    padding-inline: $space-1 $space-4;
    border: 1px dashed $color-neutral-300;
    border-radius: $space-20;

    @include text(semibold, sm);

    color: $color-neutral;
    white-space: nowrap;

    transition: $blur-duration-sm;

    &:hover {
      color: inherit;
      transition: $hover-duration-sm;
    }

    &:active {
      color: inherit;
      transition: $active-duration-sm;
    }

    #{$minimal} & {
      width: fit-content;
      padding-inline: $space-1;
      border: none;
      border-left: 1px solid transparent;
    }

    &-icon {
      width: 48px;
      height: 48px;
      padding: $space-3;
      border-radius: 50%;

      background-color: $color-neutral-100;
    }
  }
}
</style>
