<script setup lang="ts">
</script>

<template>
  <AppWidget
    class="dashboard-thread-widget"
    icon="waves"
    title="Потоки"
  >
    <template #trailingHeader>
      <AppButton
        color="neutral"
        size="sm"
        variant="nofilled"
        @click="navigateTo('/threads')"
      >
        Смотреть все
      </AppButton>
    </template>
    <template #content>
      <div class="dashboard-thread-widget__content">
        <ThreadEntry />
        <ThreadEntry />
        <ThreadEntry />
      </div>
    </template>
  </AppWidget>
</template>

<style lang="scss">
.dashboard-thread-widget {
  &__content {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: $space-4;
  }
}
</style>
