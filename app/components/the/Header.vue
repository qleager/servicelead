<script lang="ts" setup>

</script>

<template>
  <header class="header">
    <!-- <FinanceBalance class="header__balance" />
    <SearchDropdown class="header__search" />
    <NotificationsButton class="header__notification" />
    <TicketsButton class="header__notification" />
    <ManagerButton class="header__manager" />
    <NavigationActions /> -->
  </header>
</template>

<style lang="scss">
.header {
  $this: &;

  height: 72px;
  border: 2px solid rgb(0 0 255 / 20%);

  &::before {
    content: 'TheHeader';
    color: rgb(0 0 255 / 50%)
  }
}
</style>
