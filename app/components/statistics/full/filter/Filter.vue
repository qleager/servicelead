<template>
  <div class="statistics-full-filter">
    <div class="statistics-full-filter__top">
      <AppSelect
        icon="calendar"
        :items="['02.02.2026 – 03.03.2026']"
      />

      <div class="statistics-full-filter__group">
        <div class="statistics-full-filter__item">
          <div class="statistics-full-filter__label">
            Группировка
          </div>
          <AppSelect
            :items="[
              'Дата',
              'Оффер',
              'Проект',
              'Инструменты',
              'Потоки',
              'Города',
              'Лиды',
            ]"
          />
        </div>

        <div class="statistics-full-filter__item">
          <div class="statistics-full-filter__label">
            Детализация
          </div>
          <AppSelect
            :items="[
              'По дням',
              'По неделям',
              'По месяцам',
            ]"
          />
        </div>
      </div>
    </div>

    <div class="statistics-full-filter__bottom">
      <AppSelect
        :items="['1', '2', '3']"
        multiple
        placeholder="Проект"
        rounded
        size="xs"
      />

      <AppSelect
        :items="['1', '2', '3']"
        multiple
        placeholder="Оффер"
        rounded
        size="xs"
      />

      <AppSelect
        :items="['1', '2', '3']"
        multiple
        placeholder="Поток"
        rounded
        size="xs"
      />

      <StatisticsFullFilterSlideover />
    </div>
  </div>
</template>

<style lang="scss">
.statistics-full-filter {
  display: flex;
  flex-direction: column;
  gap: $space-2;

  &__top {
    display: flex;
    gap: $space-6;
  }

  &__bottom {
    display: flex;
    gap: $space-2;
  }

  &__group {
    display: flex;
    gap: $space-6;
  }

  &__item {
    display: flex;
    gap: $space-2;
    align-items: center;
  }

  &__label {
    display: flex;
    gap: $space-2;
    align-items: center;

    @include text(regular, xs);

    color: $color-neutral;
    text-transform: uppercase;
    letter-spacing: .08em;

    &::after {
      content: "";

      width: 4px;
      height: 4px;
      border-radius: 50%;

      background: $color-neutral-300;
    }
  }
}
</style>
