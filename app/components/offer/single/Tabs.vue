<script lang="ts" setup>
import type { TabsItem, TabsModel } from '~/components/app/Tabs.vue'
import OffersSingleInformation from '~/components/offer/single/Information.vue'
import OffersSingleStatistics from '~/components/offer/single/Statistics.vue'
import OffersSinglePricelist from '~/components/offer/single/Pricelist.vue'

// IDEA: оправдано ли нахождение табов здесь? Или лучше понять их на страницу?
// Табы одинаковы для все офферов? Одним методом получаем статистику/цены/географию?
const tabs: TabsItem[] = [
  { label: 'Статистика', value: 'statistics' },
  { label: 'Информация', value: 'info' },
  { label: 'География', value: 'geo' },
  { label: 'Прайс', value: 'price' },
]

const currentTab = ref<TabsModel>(tabs[0]?.value || '')

const activePanel = computed(() => {
  switch (currentTab.value) {
    case 'info':
      return { component: OffersSingleInformation, data: { infoData: 'infoData' } }
    case 'statistics':
      return { component: OffersSingleStatistics, data: { infoData: 'infoData' } }
    case 'price':
      return { component: OffersSinglePricelist, data: { infoData: 'infoData' } }
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
      class="offer-single-tabs-item"
      color="neutral"
      :items="tabs"
      variant="pill"
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
    padding: $space-4;
    border-radius: $radius-10;
    background: white;
  }
}
</style>
