<script lang="ts" setup>
import type { TabsItem, TabsModel } from '~/components/app/Tabs.vue'

const tabs: TabsItem[] = [
  { label: 'Все проекты', value: 'all' },
  { label: 'Мастер на час', value: 'master' },
  { label: 'Бытовой ремонт', value: 'byt_rem' },
  { label: 'Универсальный', value: 'universal' },
]

const currentTab = ref<TabsModel>(tabs[0]?.value || '')
</script>

<template>
  <div class="statistics-dashboard">
    <AppTabs
      v-model="currentTab"
      class="offers-single-tabs-item"
      color="white"
      :items="tabs"
      variant="lined"
    >
      <template #trailing="{ item }">
        <AppTag
          v-if="item.value !== 'all'"
          color="neutral"
        >
          32%
        </AppTag>
      </template>
    </AppTabs>
    <AppCard>
      <template #content>
        HELLO123
      </template>
    </AppCard>
  </div>
</template>

<style lang="scss">
.statistics-dashboard {
    display: flex;
    flex-direction: column;
    gap: $space-6;
}
</style>
