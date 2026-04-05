<script lang="ts" setup>
definePageMeta({
  layout: 'auth',
})
</script>

<template>
  <div class="auth-form">
    <div class="auth-form__header">
      <div class="auth-form__title">
        Рады видеть
      </div>
      <div class="auth-form__subtitle">
        Войдите в личный кабинет
      </div>
    </div>

    <div class="auth-form__fields">
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

      <AppLabel
        class="auth-form__field"
        title="Пароль"
      >
        <AppInput
          class="auth-form__input"
          icon="eye"
          name="password"
          placeholder="Введите пароль"
          trailing-icon
          type="password"
        />
      </AppLabel>

      <div class="auth-form__actions">
        <AppCheckbox
          label="Запомнить"
          name="remember"
        />

        <NuxtLink
          class="auth-form__link"
          to="#"
        >
          Забыли пароль?
        </NuxtLink>
      </div>
    </div>

    <AppButton
      class="auth-form__button"
      type="submit"
    >
      Войти
    </AppButton>

    <div class="auth-form__actions">
      Нет аккаунта?

      <NuxtLink
        class="auth-form__link auth-form__link-cta"
        to="#"
      >
        Зарегистрироваться
      </NuxtLink>
    </div>
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

  &__fields {
    display: flex;
    flex-direction: column;
    gap: $space-4;
  }

  &__field {
    width: 100%;
  }

  &__actions {
    display: flex;
    gap: $space-3;
    justify-content: initial;
    color: $color-neutral-950;

    &:has(button) {
      gap: 0;
      justify-content: space-between;
    }
  }

  &__input {
    width: 100%;
  }

  &__link {
    @include text(regular, sm);

    color: $color-primary;
    text-decoration: none;

    &-cta {
      @include text(regular, md);
    }
  }

  &__button {
    justify-content: center;
    width: 100%;
  }
}
</style>
