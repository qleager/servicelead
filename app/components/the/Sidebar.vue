<script lang="ts" setup>
// боковая панель
</script>

<template>
  <aside class="sidebar">
    <!-- logo -->
    <NavigationMain minimal="isCollapsed" />
    <!-- collapse button -->
  </aside>
</template>

<style lang="scss">
.sidebar {
  $this: &;

  min-width: 200px;
  border: 2px solid rgb(128 0 128 / 20%);

  &::before {
    content: 'TheSidebar';
    color: rgb(128 0 128 / 50%)
  }
}
</style>
