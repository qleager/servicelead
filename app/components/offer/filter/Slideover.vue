<script lang="ts" setup>
</script>

<template>
  <AppSlideover
    class="offer-filter-slideover"
    description="Чтобы отфильтровать офферы"
    icon="filter"
    title="Фильтры"
  >
    <AppButton
      color="neutral"
      icon="filter"
      variant="lined"
    >
      <AppTag
        color="primary"
        size="sm"
      >
        5
      </AppTag>
    </AppButton>

    <template #content>
      <div class="offer-filter-slideover__content">
        <AppSelect
          v-for="i in 20"
          :key="i"
          :items="[]"
          placeholder="Город"
        />
      </div>
    </template>

    <template #footer="{ close }">
      <div class="offer-filter-slideover__footer">
        <AppButton
          color="neutral"
          variant="nofilled"
        >
          Сбросить все
        </AppButton>
        <AppButton @click="close">
          Применить
        </AppButton>
      </div>
    </template>
  </AppSlideover>
</template>

<style lang="scss">
.offer-filter-slideover {
  &__content {
    display: flex;
    flex-direction: column;
    gap: $space-3;
  }

  &__footer {
    display: flex;
    gap: $space-6;
    justify-content: flex-end;
  }
}
</style>
