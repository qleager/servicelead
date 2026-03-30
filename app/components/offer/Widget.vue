<script lang="ts" setup></script>

<template>
  <AppSection
    class="offer-widget"
    title="Топ офферы"
  >
    <template #header>
      <AppButton
        color="neutral"
        size="sm"
        variant="link"
        @click="navigateTo('/offers')"
      >
        Смотреть все
      </AppButton>
    </template>
    <template #content>
      <OfferList />
    </template>
  </AppSection>
</template>

<style lang="scss">
.offer-widget {
  &__title {
    display: flex;
    gap: $space-3;
    align-items: center;
  }
}
</style>
