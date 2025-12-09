<script lang="ts" setup>

</script>

<template>
  <header class="header">
    <FinanceBalance class="header__balance" />
    <SearchDropdown class="header__search" />
    <div class="header__group">
      <NotificationsButton
        class="header__notifications"
        variant="lined"
        color="lighter"
      />
      <TicketsButton
        class="header__tickets"
        variant="lined"
        color="lighter"
      />
      <ManagerButton class="header__manager" />
      <NavigationActions
        class="header__actions"
        mode="dropdown"
      />
    </div>
  </header>
</template>

<style lang="scss">
.header {
  $this: &;

  display: flex;
  align-items: center;
  justify-content: space-between;

  height: $space-14;
  margin-top: $space-4;

  &__search {
    width: 412px;
  }

  &__group {
    display: flex;
    gap: $space-2;
    align-items: center;
  }
}
</style>
