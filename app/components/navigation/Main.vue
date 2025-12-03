<script lang="ts" setup>
import type { NavigationMenuItem } from '~/components/navigation/Menu'
// INFO: так как навигация точно такая же в мобиле, но уже в модальном окне – то мы сепарировали ее от логики сайдбара
interface Props {
  minimal?: boolean
} 

const mainItems: NavigationMenuItem[] = [
  { icon: 'main_menu_main', label: 'Главная', to: '', onClick: () => {} },
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
// const extraItems: NavigationMenuItem[] = [
//   { icon: '', label: 'Добавить пункт меню', to: '', onClick: () => {} },
// ]
</script>

<template>
  <nav :class="classanme">
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
      :items
      :minimal
    >
      <!-- Добавить пункт меню -->
    </NavigationMenu>
  </nav>
</template>

<style lang="scss">
.navigation {
  $this: &;
}
</style>
