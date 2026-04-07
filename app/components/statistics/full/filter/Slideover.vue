<template>
  <AppSlideover
    class="statistics-full-filter-slideover"
    icon="filter"
    title="Фильтры"
  >
    <AppButton
      color="neutral"
      icon="filter"
      size="xs"
      variant="outline"
    >
      Все фильтры
    </AppButton>

    <template #content>
      <div class="statistics-full-filter-slideover__content">
        <label class="statistics-full-filter-slideover__switch">
          <div class="statistics-full-filter-slideover__switch-title">Оплаченные</div>
          <AppSwitch />
        </label>

        <div class="statistics-full-filter-slideover__group">
          <AppSelect
            :items="['1', '2', '3']"
            multiple
            placeholder="Проект"
          />

          <AppSelect
            :items="['1', '2', '3']"
            multiple
            placeholder="Оффер"
          />

          <AppSelect
            :items="['1', '2', '3']"
            multiple
            placeholder="Поток"
          />

          <AppSelect
            :items="['1', '2', '3']"
            multiple
            placeholder="Города"
          />
        </div>
      </div>
    </template>

    <template #footer="{ close }">
      <div class="statistics-full-filter-slideover__footer">
        <AppButton
          color="neutral"
          size="sm"
          variant="link"
        >
          Сбросить все
        </AppButton>
        <AppButton
          color="neutral"
          @click="close"
        >
          Применить
        </AppButton>
      </div>
    </template>
  </AppSlideover>
</template>

<style lang="scss">
.statistics-full-filter-slideover {
  &__content {
    display: flex;
    flex-direction: column;
    gap: $space-8;
  }

  &__switch {
    display: flex;
    gap: $space-4;
    justify-content: space-between;

    &-title {
      color: $color-neutral-950;
    }
  }

  &__group {
    display: flex;
    flex-direction: column;
    gap: $space-4;
  }

  &__footer {
    display: flex;
    gap: $space-6;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
