<script lang="ts" setup>
import type { TabsItem, TabsModel } from '~/components/app/Tabs.vue'
import OffersSingleInformation from '~/components/offer/single/Information.vue'

// IDEA: оправдано ли нахождение табов здесь? Или лучше понять их на страницу?
// Табы одинаковы для все офферов? Одним методом получаем статистику/цены/географию?
const tabs: TabsItem[] = [
  { label: 'Статистика', value: 'stats' },
  { label: 'Информация', value: 'info' },
  { label: 'География', value: 'geo' },
  { label: 'Прайс', value: 'price' },
]

const currentTab = ref<TabsModel>(tabs[0]?.value || '')

const activePanel = computed(() => {
  switch (currentTab.value) {
    case 'info':
      return { component: OffersSingleInformation, data: { infoData: 'infoData' } }
    default:
      return null
  }
})
</script>

<template>
  <div class="offer-single-tabs">
    <AppTabs
      v-if="tabs?.length"
      v-model="currentTab"
      :items="tabs"
      variant="outline"
      color="neutral"
      class="offer-single-tabs-item"
    />
    <Component
      :is="activePanel.component"
      v-if="activePanel"
      v-bind="activePanel.data"
      class="offer-single-tabs__panel"
    />
  </div>
</template>

<style lang="scss">
.offer-single-tabs {
  $this: &;

  display: flex;
  flex-direction: column;
  gap: $space-4;

  &__panel {
    padding: $space-6;
    border-radius: $radius-6;
    background: white;
  }
}
</style>
