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
const extraItems: NavigationMenuItem[] = [
  { icon: 'plus', label: 'Добавить пункт меню', to: '', onClick: () => {} },
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
    <NavigationMenu
      :items="extraItems"
      :minimal
      size="xl"
    />
  </nav>
</template>

<style lang="scss">
.navigation {
  $this: &;
}
</style>
