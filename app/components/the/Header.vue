<script lang="ts" setup>

</script>

<template>
  <header class="header">
    <FinanceBalance class="header__balance" />
    <SearchInput class="header__search" />
    <div class="header__group">
      <NotificationButton
        class="header__notification"
        color="neutral"
        mode="dropdown"
        variant="lined"
      />
      <TicketButton
        class="header__ticket"
        color="neutral"
        mode="dropdown"
        variant="lined"
      />
      <ManagerButton class="header__manager" />
      <NavigationActions placement="bottom" />
    </div>
  </header>
</template>

<style lang="scss">
.header {
  $this: &;

  display: flex;
  gap: $space-2;
  align-items: center;
  justify-content: space-between;

  padding-block: $space-4;
  padding-inline: $space-5 $space-7;

  background-color: rgba($color-neutral-50, 70%);

  // Не используем backdrop-filter, он ломает z-index у детей
  // backdrop-filter: blur(8px);
  // реализовываем через ::pseudo

  &::before {
    content: '';

    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    backdrop-filter: blur(8px);
  }

  &__search {
    width: 100%;
    max-width: 400px;
  }

  &__group {
    display: flex;
    gap: $space-2;
    align-items: center;
  }
}
</style>
