<script lang="ts" setup>
</script>

<template>
  <AppWidget
    title="Топ офферы"
    icon="money"
    variant="section"
    action-text="Смотреть все"
    action
    @action-click="navigateTo({ path: '/offers', query: { tab: '3' } })"
  >
    <OffersList />
  </AppWidget>
</template>
