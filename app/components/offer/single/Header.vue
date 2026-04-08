<script lang="ts" setup></script>

<template>
  <div class="offer-single-header">
    <div class="offer-single-header__media">
      <NuxtImg src="/images/offer-single-header.png" />
    </div>
    <div
      class="offer-single-header__tags"
    >
      <AppTag
        class="offer-single-header__tags-item"
        color="white"
        size="sm"
        variant="outline"
      >
        Мастер на час
      </AppTag>
      <AppTag
        class="offer-single-header__tags-item"
        color="white"
        icon="geo_radar"
        size="sm"
        variant="outline"
      >
        Топ гео
      </AppTag>
      <AppTag
        class="offer-single-header__tags-item"
        color="white"
        icon="seasonal_demand"
        size="sm"
        variant="outline"
      >
        Высокий спрос
      </AppTag>
      <AppTag
        class="offer-single-header__tags-item"
        color="white"
        size="sm"
        variant="outline"
      >
        <NuxtImg
          class="offer-single-header__tags-icon"
          :src="'/images/top-fire.svg'"
        />
        Действует акция
      </AppTag>
    </div>

    <div class="offer-single-header__title">
      Ремонт электрики
    </div>

    <div class="offer-single-header__group">
      <div class="offer-single-header__rate">
        <div class="offer-single-header__rate-label">
          Ставка
        </div>
        <div class="offer-single-header__rate-value">
          до <span class="offer-single-header__rate-value-number">1 200</span> ₽
          <AppButton
            class="offer-single-header__rate-action"
            color="white"
            icon="arrow_right"
            size="xs"
            variant="outline"
          />
        </div>
      </div>

      <AppButton
        class="offer-single-header__button"
        color="white"
      >
        Создать поток
      </AppButton>
    </div>

    <AppChip
      class="offer-single-header__indicator"
      color="green"
      standalone
    >
      <span class="offer-single-header__indicator-text">
        Подключен
      </span>
    </AppChip>
  </div>
</template>

<style lang="scss">
.offer-single-header {
  $this: &;

  position: relative;
  overflow: visible;
  display: grid;
  padding: $space-6 $space-6 $space-8 $space-8;

  &__media {
    position: absolute;
    z-index: -1;
    inset: 0;

    overflow: hidden;

    border-radius: $space-8;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: $space-2;

    &-icon {
      width: 16px;
      height: 16px;
    }
  }

  &__title {
    margin-top: $space-3;

    @include text(bold, 5xl);

    line-height: 1.375;
    color: white;
  }

  &__indicator {
    position: absolute;
    top: 24px;
    right: 24px;

    &-text {
      @include text(medium, sm);

      line-height: 1.4;
      color: white;
      text-transform: uppercase;
    }
  }

  &__group {
    display: flex;
    gap: $space-8;
    align-items: flex-end;
    margin-top: $space-20;
  }

  &__rate {
    display: flex;
    flex-direction: column;

    &-label {
      @include text(regular, sm);

      line-height: 1.4;
      color: white;
      text-transform: uppercase
    }

    &-value {
      display: inline-flex;
      gap: $space-2;
      align-items: baseline;

      @include text(medium, 2xl);

      color: white;

      &-number {
        @include text(medium, 5xl);

        line-height: 1.375;
      }
    }

    &-action {
      transform: translateY(-$space-1);
    }
  }
}
</style>
