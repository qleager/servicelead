<script lang="ts" setup>
// боковая панель
</script>

<template>
  <aside class="sidebar">
    <!-- <AppIcon class="sidebar__logo" name=""/> -->
    <div class="sidebar__logo">LOGO</div>
    <NavigationMain minimal="isCollapsed" />
    <!-- collapse button -->
     <AppButton variant="nofilled" color="darker" icon="collapse">
        Свернуть меню
     </AppButton>
  </aside>
</template>

<style lang="scss">
.sidebar {
  $this: &;

  display: flex;
  flex-direction: column;
  gap: 32px;

  min-width: 200px;
  padding-top: 24px;

  &__logo {
    margin: 0 auto;
  }
}
</style>
