<script lang="ts" setup></script>

<template>
  <AppSection class="offer-widget">
    <template #header>
      <div class="offer-widget__title">
        Топ офферы
      </div>
      <AppButton
        color="neutral"
        icon="arrow_right"
        size="xs"
        variant="lined"
      />
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
