<script lang="ts" setup>
import type { NavigationMenuItem } from './Menu.vue'

interface Props {
  minimal?: boolean
}

const props = defineProps<Props>()

const mainItems: NavigationMenuItem[] = [
  { icon: 'main_menu_main', label: 'Главная', to: '/dashboard', onClick: () => {} },
  { icon: 'main_menu_offer', label: 'Офферы', to: '', onClick: () => {} },
  { icon: 'main_menu_flows', label: 'Потоки', to: '', onClick: () => {} },
  { icon: 'main_menu_money', label: 'Финансы', to: '', onClick: () => {} },
  { icon: 'main_menu_statistic', label: 'Статистика', to: '', onClick: () => {} },
  { icon: 'main_menu_tools', label: 'Инструменты', to: '', onClick: () => {} },
]

const helpItems: NavigationMenuItem[] = [
  { icon: 'main_menu_help', label: 'Справка', to: '', onClick: () => {} },
  { icon: 'main_menu_tickets', label: 'Тикеты', to: '', onClick: () => {} },
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
      title="Помощь"
      :items="helpItems"
      :minimal
    />
    <div
      class="navigation__add-button"
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
    </div>
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
    border: 1px dashed $color-neutral-light-300;
    border-radius: $space-20;

    color: $color-neutral-light-500;
    white-space: nowrap;

    &-icon {
      width: 48px;
      height: 48px;
      padding: $space-3;
      border-radius: 50%;

      background-color: $color-neutral-light-100;
    }

    #{$minimal} & {
      width: fit-content;
      height: auto;
      padding-inline: $space-1;
      border: none;
    }
  }
}
</style>
