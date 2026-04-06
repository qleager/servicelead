<script lang="ts" setup>
definePageMeta({
  layout: 'auth',
})
</script>

<template>
  <div class="auth-signup">
    <div class="auth-signup__header">
      <div class="auth-signup__title">
        Регистрация
      </div>
      <div class="auth-signup__subtitle">
        Создайте аккаунт и начните получать конверсии
      </div>
    </div>

    <div class="auth-signup__fields">
      <AppLabel
        class="auth-signup__field"
        title="Имя"
      >
        <AppInput
          class="auth-signup__input"
          name="name"
          placeholder="Введите имя"
          type="text"
        />
      </AppLabel>

      <AppLabel
        class="auth-signup__field"
        title="Телефон"
      >
        <AppInput
          class="auth-signup__input"
          name="phone"
          placeholder="Введите номер телефона"
          type="text"
        />
      </AppLabel>

      <AppLabel
        class="auth-signup__field"
        title="E-mail"
      >
        <AppInput
          class="auth-signup__input"
          name="email"
          placeholder="Введите e-mail"
          type="text"
        />
      </AppLabel>

      <AppLabel
        class="auth-signup__field"
        title="Предпочтительный вид связи"
      >
        <AppInput
          class="auth-signup__input"
          name="social_account"
          placeholder="Введите имя пользователя"
          type="text"
        />
      </AppLabel>

      <AppLabel
        class="auth-signup__field"
        title="Источники трафика"
      >
        <AppSelect
          class="auth-signup__input"
          counter="list"
          :items="['Доски объявлений', 'Яндекс Директ', 'SEO трафик', 'Тизерные сети']"
          multiple
          placeholder="Выберите источники трафика"
          size="md"
        />
      </AppLabel>
    </div>

    <div class="auth-signup__submit">
      <AppButton
        class="auth-signup__button"
        type="submit"
      >
        Создать аккаунт
      </AppButton>
      <div class="auth-signup__consent">
        Нажимая на кнопку «Создать аккаунт» — Вы соглашаетесь на обработку ваших персональных данных.
      </div>
    </div>

    <div class="auth-signup__actions">
      Уже с нами?

      <NuxtLink
        class="auth-signup__link auth-signup__link-cta"
        to="/auth"
      >
        Войти
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="scss">
.auth-signup {
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

  &__submit {
    display: flex;
    flex-direction: column;
    gap: $space-3;
  }

  &__consent {
    @include text(regular, xs);

    color: $color-neutral;
  }
}
</style>
