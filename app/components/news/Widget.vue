<script lang="ts" setup>
</script>

<template>
  <AppWidget>
    <template #trailingHeader>
      <AppTabs
        color="primary"
        :items="['Важное', 'Новости']"
        variant="link"
      />
      <AppButton
        class="widget__button"
        color="neutral"
        icon="arrow_right"
        size="xs"
        variant="outline"
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
    &__head {
      display: flex;
    }

    &__list {
      margin-inline: -$space-2;
    }
  }
</style>
