<script lang="ts" setup>
</script>

<template>
  <AppSlideover
    title="Фильтры"
    icon="filter"
    class="offers-filter-slideover"
  >
    <AppButton
      icon="filter"
      variant="lined"
      color="neutral"
    >
      <AppTag
        color="primary"
        size="sm"
      >
        5
      </AppTag>
    </AppButton>
    <template #footer>
      <div class="offers-filter-slideover__footer">
        <AppButton
          variant="nofilled"
          color="neutral"
        >
          Сбросить все
        </AppButton>
        <AppButton>
          Применить
        </AppButton>
      </div>
    </template>
  </AppSlideover>
</template>

<style lang="scss">
.offers-filter-slideover {
  &__footer {
    display: flex;
    gap: $space-6;
    justify-content: flex-end;
  }
}
</style>
