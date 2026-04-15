<script lang="ts" setup>
definePageMeta({
  layout: 'auth',
})

const { $api } = useNuxtApp()

const onSubmit = async () => {
  try {
    await $api.auth.login({
      body: {
        email: '',
        password: '',
      },
    })
  }
  catch (error) {
    alert(error)
  }
}
</script>

<template>
  <div class="auth-login">
    <div class="auth-login__header">
      <div class="auth-login__title">
        Рады видеть
      </div>
      <div class="auth-login__subtitle">
        Войдите в личный кабинет
      </div>
    </div>

    <div class="auth-login__fields">
      <AppLabel
        class="auth-login__field"
        title="E-mail"
      >
        <AppInput
          class="auth-login__input"
          name="email"
          placeholder="Введите e-mail"
          type="text"
        />
      </AppLabel>

      <AppLabel
        class="auth-login__field"
        title="Пароль"
      >
        <AppInput
          class="auth-login__input"
          icon="eye"
          name="password"
          placeholder="Введите пароль"
          trailing-icon
          type="password"
        />
      </AppLabel>

      <div class="auth-login__actions">
        <AppCheckbox
          label="Запомнить"
          name="remember"
        />

        <NuxtLink
          class="auth-login__link"
          to="/auth/recovery"
        >
          Забыли пароль?
        </NuxtLink>
      </div>
    </div>

    <AppButton
      class="auth-login__button"
      type="submit"
      @click="onSubmit"
    >
      Войти
    </AppButton>

    <div class="auth-login__actions">
      Нет аккаунта?

      <NuxtLink
        class="auth-login__link auth-login__link-cta"
        to="/auth/signup"
      >
        Зарегистрироваться
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="scss">
.auth-login {
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
    align-items: center;
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
