<script lang="ts" setup></script>

<template>
  <AppSection class="offers-widget">
    <template #header>
      <div class="offers-widget__title">
        <NuxtImg
          src="/images/top-fire.svg"
          width="24"
        />
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
      <OffersList />
    </template>
  </AppSection>
</template>

<style lang="scss">
.offers-widget {
  &__title {
    display: flex;
    gap: $space-3;
    align-items: center;
  }
}
</style>
