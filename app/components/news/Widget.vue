<script lang="ts" setup>
</script>

<template>
  <AppWidget
    icon="news"
    title="Новости"
  >
    <template #trailingHeader>
      <AppButton
        color="neutral"
        size="sm"
        variant="nofilled"
        @click="navigateTo('/news')"
      >
        Смотреть все
      </AppButton>
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
