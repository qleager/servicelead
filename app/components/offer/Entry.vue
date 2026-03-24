<script lang="ts" setup>
const mockCities = ref([
  'Москва',
  'Санкт-Петербург',
  'Казань',
  'Екатеринбург',
  'Новосибирск',
  'Нижний Новгород',
  'Самара',
  'Омск',
  'Челябинск',
])

const mockTags = ref([
  { value: 'higher_conversion', label: 'Фильтр' },
  { value: 'seasonal_demand', label: 'Сезонное' },
  { value: 'geo_radar', label: 'Погодное' },
])

const favoritesText = computed(() => Math.random() < 0.5 ? 'Удалить из избранного' : 'Добавить в избранное')

const favoritesColor = computed(() => Math.random() < 0.5 ? 'primary' : 'white')
</script>

<template>
  <AppCard
    class="offer-entry"
    @click="navigateTo('/offers/1')"
  >
    <template #content>
      <div class="offer-entry__wrapper">
        <div class="offer-entry__header">
          <div class="offer-entry__header-media">
            <img
              alt=""
              :src="'https://picsum.photos/600/300'"
            >
          </div>
          <div class="offer-entry__header-overlay">
            <div class="offer-entry__header-tags">
              <AppTooltip
                v-for="tag in mockTags"
                :key="tag.value"
                :text="tag.label"
              >
                <AppIcon
                  :name="tag.value"
                  :size="20"
                />
              </AppTooltip>
            </div>
            <AppTooltip
              :text="favoritesText"
            >
              <AppButton
                :color="favoritesColor"
                size="xs"
                variant="link"
              >
                <AppIcon
                  name="favorites"
                  :size="32"
                />
              </AppButton>
            </AppTooltip>
          </div>
        </div>
        <div class="offer-entry__body">
          <div class="offer-entry__content">
            <div class="offer-entry__info">
              <div class="offer-entry__info-category">
                <AppTag
                  size="sm"
                  variant="soft"
                >
                  Мастер на час
                </AppTag>
              </div>
              <AppDropdown mode="hover">
                <div class="offer-entry__info-location">
                  <AppIcon
                    name="geo_16"
                    :size="16"
                  />
                  <div>
                    {{ mockCities.length }}
                  </div>
                </div>
                <template #content>
                  <div>
                    <div
                      v-for="city in mockCities"
                      :key="city"
                    >
                      {{ city }}
                    </div>
                  </div>
                </template>
              </AppDropdown>
            </div>
            <div class="offer-entry__title">
              <NuxtImg
                class="offer-entry__title-icon"
                :src="'/images/top-fire.svg'"
              />
              <div class="offer-entry__title-text">
                Ремонт холодильниковРемонт холодильников
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="offer-entry__footer">
        <div class="offer-entry__price">
          <div class="offer-entry__price-header">
            Ставка
          </div>
          <div class="offer-entry__price-value">
            До 50000 <span class="offer-entry__price-value--currency">₽</span>
          </div>
        </div>
        <div class="offer-entry__actions">
          <AppIcon
            v-if="true"
            name="lock"
          />
          <AppButton
            color="neutral"
            icon="arrow_right"
            size="xs"
            :to="{ name: 'offers-id', params: { id: 1 } }"
            variant="outline"
          />
        </div>
      </div>
    </template>
  </AppCard>
</template>

<style lang="scss">
.offer-entry{
  $this: &;

  display: flex;
  flex: 1 1 0;
  flex-direction: column;

  min-width: 240px;
  border-radius: $radius-6;

  background: white;

  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: $space-3;
  }

  &__header {
    position: relative;

    overflow: hidden;

    aspect-ratio: 2 / 1;
    width: 100%;
    padding: $space-3 $space-3 0 $space-3;
    border-radius: $radius-5;

    background: $color-blue-350;

    &-media {
      position: absolute;
      inset: 0;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &-overlay {
      position: relative;
      z-index: 1;

      display: flex;
      align-items: flex-start;
      justify-content: space-between;

      color: white;
    }

    &-tags {
      display: flex;
      gap: $space-05;
    }
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: $space-6;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: $space-1;
  }

  &__info {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &-location {
      display: flex;
      gap: $space-05;
      align-items: center;

      @include text(medium, sm);
    }
  }

  &__title {
    display: flex;
    gap: $space-1;

    @include text(semibold, md);

    &-icon {
      width: 20px;
      height: 20px;
    }
  }

  &__footer {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-top: auto;
  }

  &__price {
    display: flex;
    flex-direction: column;
    gap: $space-05;
    text-transform: lowercase;

    &-header {
      @include text(regular, xs);

      color: $color-neutral-400;
    }

    &-value {
      @include text(medium, lg);

      &--currency {
        @include text(semibold, sm);
      }
    }
  }

  &__actions {
    display: flex;
    gap: $space-3;
    align-items: center;
    color: $color-neutral-200;
  }
}
</style>
