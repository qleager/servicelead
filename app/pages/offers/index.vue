<script lang="ts" setup>
const items = [
  { label: 'Все', value: 1 },
  { label: 'Действует акция', value: 2 },
  { label: 'Топ офферы', value: 3 },
  { label: 'Избранные', value: 4 },
  { label: 'Новые', value: 5 },
]
</script>

<template>
  <div class="offers-head">
    <div class="offers-head__title">
      Офферы
    </div>
    <div class="offers-head__filters">
      <AppTabs
        :items="items"
        variant="lined"
        color="darker"
        class="offers-head__filters-tabs"
      />
      <div class="offers-head__filters-buttons">
        <AppButton
          icon="search"
          variant="lined"
          color="darker"
        />
        <AppButton
          icon="filter"
          variant="lined"
          color="darker"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.offers-head {
  display: flex;
  gap: $space-10;
  align-items: center;
  width: 100%;

  &__title {
    @include text(bold, 5xl);
  }

  &__filters {
    display: flex;
    gap: $space-10;
    justify-content: space-between;
    width: 100%;

    &-tabs {
      margin-right: auto;
    }

    &-buttons {
      display: flex;
      gap: $space-2;
    }
  }
}
</style>
