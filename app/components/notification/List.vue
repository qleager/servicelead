<script lang="ts" setup></script>

<template>
  <div class="notification-list">
    <NotificationEntry
      v-for="i in 4"
      :key="i"
      minimal
    />
  </div>
</template>

<style lang="scss">
.notification-list {
  display: flex;
  flex-direction: column;
  gap: $space-1;
}
</style>
