<script lang="ts" setup>
</script>

<template>
  <AppWidget
    class="thread-widget"
    icon="waves"
    title="Потоки"
  >
    <template #content>
      <div class="thread-widget__content">
        <ThreadEntry
          v-for="i in 3"
          :key="i"
        />
      </div>
    </template>
  </AppWidget>
</template>

<style lang="scss">
.thread-widget {
  &__content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: $space-4;
  }
}
</style>
