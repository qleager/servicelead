<script setup lang="ts">
</script>

<template>
  <div class="threads">
    <div class="threads__header">
      <div class="threads__title">
        Потоки
      </div>
      <ThreadFilterByStatus />
    </div>
    <div class="threads__main">
      <AppCard>
        <template #top>
          <div class="threads__top">
            <ThreadActions />
            <ThreadFilter />
          </div>
        </template>
        <template #content>
          Table
        </template>
        <template #footer>
          <AppPagination
            counter
            total="70"
          />
        </template>
      </AppCard>
    </div>
  </div>
</template>

<style lang="scss">
.threads {
  display: flex;
  flex-direction: column;
  gap: $space-4;

  &__header {
    display: flex;
    gap: $space-6;
    align-items: center;
  }

  &__title {
    @include text(bold, 5xl);
  }

  &__top {
    display: flex;
    gap: $space-4;
    align-items: center;
    justify-content: space-between;

    padding: $space-4;
  }
}
</style>
