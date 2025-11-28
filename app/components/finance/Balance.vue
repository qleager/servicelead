<script lang="ts" setup>
// TODO: Пока нет апи исключительно просто верстку
</script>

<template>
  <div class="balance">
    <div class="balance__item">
      <div class="balance__value">
        325 000 ₽
      </div>
      <div class="balance__label">
        Баланс
      </div>
    </div>

    <div class="balance__item">
      <div class="balance__value">
        170 432 ₽
      </div>
      <div class="balance__label">
        Холд
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.balance {
  $this: &;

  display: flex;
  gap: $space-4;
  align-items: center;
  width: 236px;

  &__item {
    display: flex;
    flex: 1 1 0;
    flex-direction: column;
    justify-content: space-around;

    height: 43px;
  }

  &__value {
    @include text(regular, lg);
  }

  &__label {
    @include text(light, xs);

    color: $color-neutral-light-450;
  }
}
</style>
