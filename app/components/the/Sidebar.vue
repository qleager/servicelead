<script lang="ts" setup>
// боковая панель
</script>

<template>
  <aside :class="classanme">
    <!-- logo -->
    <NavigationMain minimal="isCollapsed" />
    <!-- collapse button -->
  </aside>
</template>

<style lang="scss">
.sidebar {
  $this: &;
}
</style>
