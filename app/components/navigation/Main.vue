<script lang="ts" setup>
import type { NavigationMenuItem } from '~/components/navigation/Menu'
// INFO: так как навигация точно такая же в мобиле, но уже в модальном окне – то мы сепарировали ее от логики сайдбара
interface Props {
  minimal?: boolean
} 

const mainItems: NavigationMenuItem[] = [{}]
const helpItems: NavigationMenuItem[] = [{}]
</script>

<template>
  <nav :class="classanme">
    <NavigationMenu
      :items
      :minimal
    />
    <NavigationMenu
      title="Помощь"
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
