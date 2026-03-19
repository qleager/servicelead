<script lang="ts" setup>
import type { TabsItem } from '~/components/app/Tabs.vue'

const tabs: TabsItem[] = [
  { label: 'Все проекты', value: 'all' },
  { label: 'Мастер на час', value: 'master' },
  { label: 'Бытовой ремонт', value: 'byt_rem' },
  { label: 'Универсальный', value: 'universal' },
]
</script>

<template>
  <div class="statistics-dashboard">
    <AppTabs
      color="white"
      :items="tabs"
    >
      <template #trailing="{ item }">
        <AppTag
          v-if="item.value !== 'all'"
          color="neutral"
          size="sm"
        >
          32%
        </AppTag>
      </template>
    </AppTabs>
    <AppCard>
      <template #content>
        <div class="statistics-dashboard__widgets">
          <StatisticsWidgetLead />
          <StatisticsWidgetLead />
          <StatisticsWidgetLead />
          <!-- <StatisticsWidgetConversion /> -->
          <!-- <StatisticsWidgetTraffic /> -->
        </div>
      </template>
    </AppCard>
  </div>
</template>

<style lang="scss">
.statistics-dashboard {
  display: flex;
  flex-direction: column;
  gap: $space-6;

  &__widgets {
    display: flex;
    gap: $space-4;
    justify-content: space-between;
    width: 100%;
  }
}
</style>
