<script lang="ts" setup>
import type { TabsItem } from '~/components/app/Tabs.vue'

const tabs: TabsItem[] = [
  { label: 'Важное', value: 'important' },
  { label: 'Новости', value: 'news' },
]
</script>

<template>
  <AppWidget>
    <template #trailingHeader>
      <AppTabs
        color="primary"
        :items="tabs"
        size="xs"
        variant="outline"
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
