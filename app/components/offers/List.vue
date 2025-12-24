<script lang="ts" setup>
// TODO: Добавить тип item'ов
const mockOffers: any[] = [
  {
    id: 1,
    title: 'Ремонт холодильников',
    image: 'https://picsum.photos/600/300',
    tag: 'Мастер на час',
    maxPrice: 1200,
    isHot: false,
    cities: [
      'Москва',
      'Санкт-Петербург',
      'Казань',
      'Екатеринбург',
      'Новосибирск',
      'Нижний Новгород',
      'Самара',
      'Омск',
      'Челябинск',
    ],
    tags: [
      { value: 'higher_conversion', label: 'Фильтр' },
      { value: 'seasonal_demand', label: 'Сезонное' },
      { value: 'geo_radar', label: 'Погодное' },
    ],
    isFavorite: true,
    isLocked: false,
  },
  {
    id: 2,
    title: 'Ремонт холодильников',
    image: 'https://picsum.photos/600/400',
    tag: 'Универсальный',
    maxPrice: 900,
    isHot: false,
    cities: [
      'Москва',
      'Санкт-Петербург',
      'Краснодар',
      'Ростов-на-Дону',
      'Воронеж',
      'Волгоград',
      'Саратов',
    ],
    tags: [
      { value: 'higher_conversion', label: 'Фильтр' },
      { value: 'seasonal_demand', label: 'Сезонное' },
      { value: 'geo_radar', label: 'Погодное' },
    ],
    isFavorite: false,
    isLocked: true,
  },
  {
    id: 3,
    title: 'Ремонт холодильников',
    image: 'https://picsum.photos/600/500',
    tag: 'Бытовая техника',
    maxPrice: 500,
    isHot: true,
    cities: [
      'Москва',
      'Санкт-Петербург',
      'Казань',
      'Уфа',
      'Пермь',
      'Тюмень',
      'Челябинск',
      'Екатеринбург',
    ],
    tags: [
      { value: 'higher_conversion', label: 'Фильтр' },
      { value: 'seasonal_demand', label: 'Сезонное' },
      { value: 'geo_radar', label: 'Погодное' },
    ],
    isFavorite: false,
    isLocked: false,
  },
  {
    id: 4,
    title: 'Ремонт холодильников',
    image: 'https://picsum.photos/600/600',
    tag: 'Мастер на час',
    maxPrice: 2300,
    isHot: true,
    cities: [
      'Новосибирск',
      'Томск',
      'Кемерово',
      'Барнаул',
    ],
    tags: [
      { value: 'higher_conversion', label: 'Фильтр' },
      { value: 'seasonal_demand', label: 'Сезонное' },
      { value: 'geo_radar', label: 'Погодное' },
    ],
    isFavorite: false,
    isLocked: false,
  },
]
</script>

<template>
  <div class="offers-list">
    <div class="offers-list__header">
      <div class="offers-list__title">
        <AppIcon
          name="top_fire"
        />
        <div>Топ Офферы</div>
      </div>
      <div class="offers-list__actions">
        Смотреть все
        <AppButton
          icon="arrow_right"
          variant="lined"
          color="darker"
          to="/offers"
          size="xs"
          :icon-size="16"
        />
      </div>
    </div>
    <div class="offers-list__items">
      <OffersEntry
        v-for="offer in mockOffers"
        :key="offer.id"
        :offer="offer"
      />
    </div>
  </div>
</template>

<style lang="scss">
.offers-list {
  $this: &;

  display: flex;
  flex-direction: column;
  gap: $space-4;
  width: 100%;

  &__header {
    display: flex;
    gap: $space-4;
    align-items: center;
    justify-content: space-between;
  }

  &__title {
    display: flex;
    gap: $space-3;
    align-items: center;
    justify-content: space-between;

    @include text(semibold, xl);
  }

  &__actions {
    display: flex;
    gap: $space-4;
    align-items: center;
    justify-content: space-between;
  }

  &__items {
    display: flex;
    gap: $space-4;
    justify-content: space-between;
    width: 100%;
  }
}
</style>
