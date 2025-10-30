<script lang="ts" setup>

</script>

<template>
  <header class="header">
    <FinanceBalance class="header__balance" />
    <SearchDropdown class="header__search" />
    <NotificationsToggle class="header__notification" />
    <TicketsToggle class="header__notification" />
    <ManagerToggle class="header__manager" />
  </header>
</template>

<style lang="scss">
.header {
  $this: &;
}
</style>
