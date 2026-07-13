<script lang="ts" setup>
</script>

<template>
  <AppCard
    class="offer-entry"
    @click="navigateTo('/offers/1')"
  >
    <template #top>
      <div class="offer-entry__top">
        <div class="offer-entry__media" />

        <div class="offer-entry__overlay">
          <AppTooltip>
            <div class="offer-entry__tags">
              <AppIcon
                class="offer-entry__tag"
                name="higher_conversion"
                :size="20"
              />
              <AppIcon
                class="offer-entry__tag"
                name="sun"
                :size="20"
              />
              <AppIcon
                class="offer-entry__tag"
                name="geo_radar"
                :size="20"
              />
              <AppIcon
                class="offer-entry__tag"
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
    </template>
    <template #content>
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
    </template>
    <template #footer>
      <div class="offer-entry__footer">
        <AppLabeledValue
          caption="Ставка"
          class="offer-entry__price"
          size="sm"
        >
          <template #leadingValue>
            <span class="offer-entry__price-leading">до</span>
          </template>
          <template #value>
            <span class="offer-entry__price-value">2300 <span class="offer-entry__price-currency">₽</span></span>
          </template>
        </AppLabeledValue>
        <div class="offer-entry__actions">
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
.offer-entry {
  $this: &;

  flex: 1 1 0;
  min-width: 240px;

  &__top {
    position: relative;

    box-sizing: content-box;
    min-height: 150px;
    padding: $space-2 $space-2 $space-1 $space-2;

    color: white;
  }

  &__media {
    position: absolute;
    inset: $space-2 $space-2 $space-1 $space-2;
    border-radius: $space-6;
    background: url('/images/offer-head-img.png') no-repeat center/cover;
  }

  &__overlay {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: $space-3;
  }

  &__tags {
    display: flex;
    gap: $space-05;
  }

  &__tag {
    padding: $space-05;
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
      letter-spacing: -0.03em;
    }
  }

  &__footer {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-top: auto;
  }

  &__price {
    &-leading {
      line-height: normal;
    }

    &-value {
      line-height: normal;
    }

    &-currency {
      @include text(semibold, sm);
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
