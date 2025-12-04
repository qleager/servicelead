<script lang="ts" setup>
interface Props {
  items: Item[]
  title?: string
  minimal?: boolean
}

interface Item {
  icon: IconProps['name']
  label: string
  to?: string // навигация - когда нибудь сделаем типы из router, чтобы тут затипизированы были только реальные роуты (сделать пометку TODO)
  onClick: () => void
}

export type { Props as NavigationMenuProps, Item as NavigationMenuItem }
</script>

<template>
  <div />
</template>

<style lang="scss">
.navigation-menu {}
</style>
