<script lang="ts" setup>
const onButtonClick = async () => {
  await navigateTo('tickets')
}
</script>

<template>
  <div class="help-widget">
    <div class="help-widget__info">
      <AppIcon
        class="help-widget__icon"
        name="new_widget"
        :size="40"
      />

      <div class="help-widget__text">
        <div class="help-widget__title">
          Не нашли нужный виджет?
        </div>
        <div class="help-widget__subtitle">
          Напишите нам и наша команда разработки обязательно добавит его!
        </div>
      </div>
    </div>

    <AppButton
      variant="filled"
      color="lighter"
      class="help-widget__ticket-btn"
      @click="onButtonClick"
    >
      Создать тикет
    </AppButton>
  </div>
</template>

<style lang="scss">
.help-widget {
  $this: &;

  display: flex;
  gap: $space-2;
  justify-content: space-between;

  &__top {
    display: flex;
    justify-content: space-between;
  }

  &__info {
    display: flex;
    gap: $space-8;
  }

  &__icon {
    color: $color-neutral-light-300
  }

  &__text {
    display: flex;
    flex-direction: column;
    gap: $space-2;
  }

  &__title {
    color: $color-neutral-light-950;

    @include text(regular, xl);
  }

  &__subtitle {
    color: $color-neutral-light-500;

    @include text(regular, md);
  }

  &__ticket-btn {
    background: $color-neutral-light-100;
  }

  &__menu {
    display: flex;
    gap: $space-4;
    align-items: center;
    justify-content: flex-end;

    height: 88px;
    padding-right: 24px
  }

  &__menu-label {
    @include text(regular, sm);

    color: $color-neutral-light-500;
  }

  &__menu-item {
    display: inline-flex;
    color: $color-neutral-light-500;
  }
}
</style>
