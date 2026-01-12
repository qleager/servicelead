<script lang="ts" setup>
import type { Tag, Rate } from '~/components/offers/offer/head.vue'
import type { TabsItem, TabsModel } from '~/components/App/Tabs.vue'

const tabs: TabsItem[] = [
  { label: 'Статистика', value: 'stats' },
  { label: 'Информация', value: 'info' },
  { label: 'География', value: 'geo' },
  { label: 'Прайс', value: 'price' },
]

const tags: Tag[] = [
  { label: 'Мастер на час' },
  { label: 'Топ гео', icon: 'geo_radar' },
  { label: 'Высокий спрос', icon: 'seasonal_demand' },
  { label: 'Действует акция', icon: 'top_fire' },
]

const rate: Rate = {
  label: 'Ставка',
  prefix: 'до',
  value: 1200,
  currency: '₽',
}

const currentTab = ref<TabsModel>(tabs[0]?.value || '')
</script>

<template>
  <section class="page-offer">
    <OffersOfferHead
      v-model="currentTab"
      :tags="tags"
      title="Ремонт электрики"
      :rate="rate"
      :tabs="tabs"
    />

    <div class="page-offer__active">
      {{ currentTab }}
    </div>
  </section>
</template>

<style lang="scss">
.page-offer {
  $this: &;

  display: flex;
  flex-direction: column;
  gap: $space-4;

  height: 100%;
  padding-top: 44px;

  &__active {
    height: 200px;
    border: 1px solid $color-gray-950 ;
  }
}
</style>
