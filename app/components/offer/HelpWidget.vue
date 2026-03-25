<script lang="ts" setup>
</script>

<template>
  <div class="offer-help-widget">
    <div class="offer-help-widget__title">
      Нужна помощь?
    </div>

    <div class="offer-help-widget__text">
      Создайте тикет или задайте его напрямую своему менеджеру
    </div>

    <div class="offer-help-widget__actions">
      <AppButton
        class="offer-help-widget__action"
        color="white"
        size="sm"
        type="button"
        variant="solid"
      >
        Менеджер
      </AppButton>

      <AppButton
        class="offer-help-widget__action"
        color="white"
        size="sm"
        type="button"
        variant="solid"
      >
        Тикет
      </AppButton>
    </div>
  </div>
</template>

<style lang="scss">
.offer-help-widget {
  display: flex;
  flex-direction: column;
  gap: $space-4;

  padding: $space-6;
  border-radius: $radius-4;

  background: $color-neutral-50;

  &__title {
    @include text(regular, xl);

    // line-height: 1.35;
    // letter-spacing: -.035em;
  }

  &__text {
    @include text(regular, md);

    // line-height: 1.5;
    color: $color-neutral-600;

    // letter-spacing: -.035em;
  }

  &__actions {
    display: flex;
    gap: $space-4;
    margin-top: $space-2;
  }

  &__action {
    justify-content: center;
    width: 100%;
  }
}
</style>
