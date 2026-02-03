<script lang="ts" setup>
</script>

<template>
  <div class="widget-informer">
    <AppIcon
      class="widget-informer__icon"
      name="new_widget"
      :size="40"
    />

    <div class="widget-informer__content">
      <div class="widget-informer__title">
        Не&nbsp;нашли нужный виджет?
      </div>
      <div class="widget-informer__text">
        Напишите нам и&nbsp;наша команда разработки обязательно добавит&nbsp;его!
      </div>
    </div>

    <AppButton
      variant="filled"
      color="neutral"
      class="widget-informer__button"
    >
      Создать тикет
    </AppButton>
  </div>
</template>

<style lang="scss">
.widget-informer {
  $this: &;

  display: flex;
  gap: $space-8;

  &__icon {
    color: $color-neutral-300
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: $space-2;
  }

  &__title {
    @include text(regular, xl);

    line-height: 1.2;
    color: $color-neutral-950;
  }

  &__text {
    @include text(regular, md);

    color: $color-neutral;
  }

  &__button {
    align-self: center;
    margin-left: auto;
  }
}
</style>
