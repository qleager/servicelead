<script lang="ts" setup>
definePageMeta({
  layout: 'auth',
})
</script>

<template>
  <div class="auth-form">
    <AppButton
      color="neutral"
      icon="arrow_left"
      size="sm"
      variant="link"
    >
      Вернуться к входу
    </AppButton>

    <div class="auth-form__header">
      <div class="auth-form__title">
        Сброс пароля
      </div>
      <div class="auth-form__subtitle">
        Укажите e-mail — отправим ссылку для сброса
      </div>
    </div>

    <AppLabel
      class="auth-form__field"
      title="E-mail"
    >
      <AppInput
        class="auth-form__input"
        name="email"
        placeholder="Введите e-mail"
        type="text"
      />
    </AppLabel>

    <AppButton
      class="auth-form__button"
      type="submit"
    >
      Отправить ссылку
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

  &__field {
    width: 100%;
  }

  &__input {
    width: 100%;
  }

  &__button {
    justify-content: center;
    width: 100%;
  }
}
</style>
