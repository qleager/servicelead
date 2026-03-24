<script lang="ts" setup>
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
            <NuxtImg :src="'/images/offer-head-img.png'" />
          </div>
          <div class="offer-entry__header-overlay">
            <AppTooltip>
              <div class="offer-entry__header-tags">
                <AppIcon
                  class="offer-entry__header-tag"
                  name="higher_conversion"
                  :size="20"
                />
                <AppIcon
                  class="offer-entry__header-tag"
                  name="sun"
                  :size="20"
                />
                <AppIcon
                  class="offer-entry__header-tag"
                  name="geo_radar"
                  :size="20"
                />
                <AppIcon
                  class="offer-entry__header-tag"
                  name="geo_radar"
                  :size="20"
                />
              </div>
              <template #content>
                <div class="offer-entry__tooltip-item">
                  <AppIcon
                    class="offer-entry__tooltip-icon"
                    name="higher_conversion"
                    :size="16"
                  />
                  Высокая конверсия
                </div>
                <div class="offer-entry__tooltip-item">
                  <AppIcon
                    class="offer-entry__tooltip-icon"
                    name="sun"
                    :size="16"
                  />
                  Высокая конверсия
                </div>
                <div class="offer-entry__tooltip-item">
                  <AppIcon
                    class="offer-entry__tooltip-icon"
                    name="geo_radar"
                    :size="16"
                  />
                  Топ ГЕО
                </div>
                <div class="offer-entry__tooltip-item">
                  <AppIcon
                    class="offer-entry__tooltip-icon"
                    name="geo_radar"
                    :size="16"
                  />
                  Топ ГЕО
                </div>
              </template>
            </AppTooltip>
            <AppTooltip
              content="Добавить в избранное"
            >
              <AppButton
                color="white"
                size="xs"
                variant="nofilled"
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
                  Бытовой ремонт
                </AppTag>
              </div>
              <AppDropdown mode="hover">
                <div class="offer-entry__info-location">
                  <AppIcon
                    name="geo_16"
                    :size="16"
                  />
                  <div>
                    23 +
                  </div>
                </div>
                <template #content>
                  <div>
                    location tooltip
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
                Ремонт ванной под ключ
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
            до 2300 <span class="offer-entry__price-value--currency">₽</span>
          </div>
        </div>
        <div class="offer-entry__actions">
          <AppButton
            color="neutral"
            icon="arrow_right"
            size="xs"
            :to="{ name: 'offers-id', params: { id: 1 } }"
            variant="lined"
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
    margin: -$space-2 (-$space-2) 0;
    border-radius: $radius-6;

    background: $color-blue-350;

    &-media {
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &-overlay {
      position: absolute;
      z-index: 1;
      top: 12px;
      right: 12px;
      left: 12px;

      display: flex;
      align-items: flex-start;
      justify-content: space-between;

      color: white;
    }

    &-tags {
      display: flex;
      gap: $space-05;
    }

    &-tag {
      padding: $space-05;
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
      gap: $space-1;
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

    &-text {
      letter-spacing: -.03em;
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

    &-header {
      @include text(regular, xs);

      color: $color-neutral-400;
      letter-spacing: -.03em;
    }

    &-value {
      @include text(medium, lg);

      line-height: 1.4;
      letter-spacing: -.03em;

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

  &__tooltip {
    &-item {
      display: flex;
      gap: $space-2;
      white-space: nowrap;

      &:not(:first-child) {
        margin-top: $space-2;
      }
    }

    &-icon {
      flex-shrink: 0;
    }
  }
}
</style>
