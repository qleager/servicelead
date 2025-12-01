<script lang="ts" setup>
</script>

<template>
  <div class="balance">
    <div class="balance__item">
      <div class="balance__item-value">
        325 000 ₽
      </div>
      <div class="balance__item-label">
        Баланс
      </div>
    </div>

    <div class="balance__item">
      <div class="balance__item-value">
        170 432 ₽
      </div>
      <div class="balance__item-label">
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

  &__item {
    display: flex;
    flex: 1 1 0;
    flex-direction: column;
    justify-content: space-around;

    min-width: 110px;
    height: 43px;

    white-space: nowrap;

    &-value {
      @include text(regular, lg);
    }

    &-label {
      @include text(light, xs);

      color: $color-neutral-light-450;
    }
  }
}
</style>
