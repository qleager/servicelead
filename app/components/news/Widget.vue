<script lang="ts" setup>
</script>

<template>
  <AppWidget
    icon="news"
    title="Новости"
  >
    <template #title>
      <AppButton
        color="neutral"
        icon="arrow_right"
        size="xs"
        variant="lined"
      />
    </template>
    <template #content>
      <div class="news-widget__list">
        <NewsEntry
          v-for="i in 6"
          :key="i"
          minimal
        />
      </div>
    </template>
  </AppWidget>
</template>

<style lang="scss">
  .news-widget {
    &__list {
      margin-inline: -$space-2;
    }
  }
</style>
