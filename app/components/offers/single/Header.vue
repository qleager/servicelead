<script lang="ts" setup>
// нужные доработки в других компонентах
// Tag:
// 1) нету возможности раскрасить иконки
// 2) нету hover цветом Purple_100 как в макете

// Button (.offers-single-header__rate-action)
// 1) нет цвета иконки как в макете $color-neutral-light-300.  ( &#{$neutral-color} ставит цвет текста $color-neutral-950 )
</script>

<template>
  <div class="offers-single-header">
    <div
      class="offers-single-header__tags"
    >
      <AppTag
        v-for="i in 5"
        :key="i"
        class="offers-single-header__tags-item"
        icon="geo_radar"
        size="sm"
        color="neutral"
      >
        Lorem ipsum
      </AppTag>
    </div>

    <div class="offers-single-header__title">
      <span class="offers-single-header__title-text">
        Lorem ipsum dolor sit amet consectetur.
      </span>

      <AppChip
        standalone
        color="green"
        class="offers-single-header__indicator"
      >
        <span class="offers-single-header__indicator-text">
          Подключен
        </span>
      </AppChip>
    </div>

    <div class="offers-single-header__group">
      <div class="offers-single-header__rate">
        <div class="offers-single-header__rate-label">
          Ставка
        </div>
        <div class="offers-single-header__rate-value">
          до <span class="offers-single-header__rate-value-number">15 000</span> ₽
          <AppButton
            class="offers-single-header__rate-action"
            icon="arrow_right"
            size="xs"
            variant="lined"
            color="neutral"
          />
        </div>
      </div>

      <AppButton
        class="offers-single-header__button"
      >
        Создать поток
      </AppButton>
    </div>
  </div>
</template>

<style lang="scss">
.offers-single-header {
  $this: &;

  position: relative;
  overflow: visible;
  display: flex;
  flex-direction: column;

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: $space-2;

    &-item {
      outline: 1px dashed $color-primary
    }
  }

  &__title {
    display: flex;
    gap: $space-4;
    align-items: center;
    margin-top: $space-1;

    &-text {
      @include text(bold, 5xl);
    }
  }

  &__indicator {
    margin-top: $space-2;

    &-text {
      color: $color-neutral-400;

      @include text(regular, xs);
    }
  }

  &__group {
    display: flex;
    gap: $space-8;
    align-items: flex-end;
    margin-top: $space-6;
  }

  &__rate {
    display: flex;
    flex-direction: column;

    &-label {
      @include text(regular, sm);

      text-transform: uppercase;
    }

    &-value {
      transform: translateY($space-2);
      display: inline-flex;
      gap: $space-2;
      align-items: baseline;

      @include text(medium, 2xl);

      &-number {
        @include text(medium, 5xl);
      }
    }

    &-action {
      outline: 1px dashed $color-primary;
    }
  }
}
</style>
