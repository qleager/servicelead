<script lang="ts" setup>
const imgSrc = ''
</script>

<template>
  <button class="manager-button">
    <span class="manager-button__avatar">
      <img
        :src="imgSrc || '/images/default-avatar.png'"
        class="manager-button__avatar-image"
      >
    </span>

    <span class="manager-button__info">
      <span class="manager-button__name">Иванов Иван</span>
      <span class="manager-button__role">Ваш менеджер</span>
    </span>
  </button>
</template>

<style lang="scss">
.manager-button {
  $this: &;

  cursor: pointer;

  display: flex;
  gap: $space-4;
  align-items: center;

  height: 56px;
  padding: $space-1 $space-6 $space-1 $space-1;
  border-radius: $space-12;

  &__avatar {
    overflow: hidden;
    width: 48px;
    height: 48px;
    border-radius: $space-18;

    &-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: $space-05;
    align-items: flex-start;
    justify-content: center;

    height: 42px;

    color: $color-neutral-light-950;
  }

  &__name {
    @include text(SemiBold, md);
  }

  &__role {
    @include text(light, xs);
  }

  &:hover {
    background: #fff;
  }

  &:active {
    background: $color-neutral-light-200;
  }

  &:disabled {
    pointer-events: none;
    cursor: default;
  }
}
</style>
