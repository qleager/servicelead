<script lang="ts" setup>
const onButtonClick = async () => {
  await navigateTo({ name: 'tickets' })
}
</script>

<template>
  <div class="widget-informer">
    <div class="widget-informer__info">
      <AppIcon
        class="widget-informer__icon"
        name="new_widget"
        :size="40"
      />

      <div class="widget-informer__text">
        <div class="widget-informer__title">
          Не&nbsp;нашли нужный виджет?
        </div>
        <div class="widget-informer__subtitle">
          Напишите нам и&nbsp;наша команда разработки обязательно добавит&nbsp;его!
        </div>
      </div>
    </div>

    <AppButton
      variant="filled"
      color="neutral"
      class="widget-informer__ticket-btn"
      @click="onButtonClick"
    >
      Создать тикет
    </AppButton>
  </div>
</template>

<style lang="scss">
.widget-informer {
  $this: &;

  display: flex;
  gap: $space-2;
  align-items: center;
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
    color: $color-neutral-300
  }

  &__text {
    display: flex;
    flex-direction: column;
    gap: $space-2;
  }

  &__title {
    @include text(regular, xl);

    color: $color-neutral-950;
  }

  &__subtitle {
    @include text(regular, md);

    color: $color-neutral-500;
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

    color: $color-neutral-500;
  }

  &__menu-item {
    display: inline-flex;
    color: $color-neutral-500;
  }
}
</style>
