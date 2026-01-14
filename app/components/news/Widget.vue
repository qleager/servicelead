<script lang="ts" setup>
</script>

<template>
  <AppWidget
    title="Новости"
    icon="news"
    action
    action-text="Смотреть все"
    class="news-widget"
  >
    <div class="news-widget__list">
      <NewsEntry
        v-for="i in 6"
        :key="i"
        minimal
      />
    </div>
  </AppWidget>
</template>

<style lang="scss">
  .news-widget {
    max-height: 440px;

    &__list {
      overflow-y: auto;
      max-width: 100%;
    }
  }
</style>
