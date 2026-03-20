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
  <AppSection class="statistics-dashboard">
    <template #header>
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
    </template>
    <template #content>
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
    </template>
  </AppSection>
</template>

<style lang="scss">
.statistics-dashboard {
  &__widgets {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: $space-4;
  }
}
</style>
