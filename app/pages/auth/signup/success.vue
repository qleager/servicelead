<script lang="ts" setup>
definePageMeta({
  layout: 'auth',
})
</script>

<template>
  <div class="auth-form">
    <div class="auth-form__header">
      <div class="auth-form__title">
        Почти готово
      </div>
      <div class="auth-form__subtitle">
        Письмо с паролем уже летит на вашу почту.<br> Заходите в кабинет, но  пока менеджер не подтвердит аккаунт, некоторые функции будут недоступны.
      </div>
    </div>

    <AppButton
      class="auth-form__button"
    >
      Войти в кабинет
    </AppButton>
  </div>
</template>

<style lang="scss">
.auth-form {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: $space-9;

  max-width: 402px;

  &__title {
    @include text(semibold, 3xl);

    color: $color-neutral-950;
  }

  &__subtitle {
    margin-top: $space-2;

    @include text(regular, md);

    color: $color-neutral;
  }

  &__button {
    justify-content: center;
    width: 100%;
  }
}
</style>
