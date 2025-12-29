<script lang="ts" setup>
const openTopOffers = () => {
  navigateTo({ path: '/offers', query: { tab: '3' } })
}
</script>

<template>
  <AppWidget
    title="Топ офферы"
    icon="money"
    variant="section"
    action-text="Смотреть все"
    action
    @action-click="openTopOffers"
  >
    <OffersList />
  </AppWidget>
</template>
