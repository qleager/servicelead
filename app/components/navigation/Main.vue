<script lang="ts" setup>
import type { NavigationMenuItem } from './Menu.vue'

interface Props {
  minimal?: boolean
}

defineProps<Props>()

const mainItems: NavigationMenuItem[] = [
  { icon: 'main_menu_main', label: 'Главная', to: '/dashboard', onClick: () => {} },
  { icon: 'main_menu_offer', label: 'Офферы', to: '/offers', onClick: () => {} },
  { icon: 'main_menu_flows', label: 'Потоки', to: '/threads', onClick: () => {} },
  { icon: 'main_menu_money', label: 'Финансы', to: '/finances', onClick: () => {} },
  { icon: 'main_menu_statistic', label: 'Статистика', to: '/statistic', onClick: () => {} },
  { icon: 'main_menu_tools', label: 'Инструменты', to: '/tools', onClick: () => {} },
]
const helpItems: NavigationMenuItem[] = [
  { icon: 'main_menu_help', label: 'Справка', to: '/help', onClick: () => {} },
  { icon: 'main_menu_tickets', label: 'Тикеты', to: '/tickets', onClick: () => {} },
  { icon: 'main_menu_doc_API', label: 'Документация API', to: '/docapi', onClick: () => {} },
  { icon: 'main_menu_account', label: 'Личный кабинет', to: '/account', onClick: () => {} },
]
</script>

<template>
  <nav class="navigation">
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
    }
}
</style>
