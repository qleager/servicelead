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
        Восстановление доступа
      </div>
      <div class="auth-form__subtitle">
        Выберите удобный способ
      </div>
    </div>

    <div class="auth-form__methods">
      <NuxtLink
        class="auth-form__method"
        to="#"
      >
        <div class="auth-form__method-inner">
          <div class="auth-form__method-title">
            Сбросить пароль по e-mail
          </div>
          <div class="auth-form__method-text">
            Отправим ссылку для сброса на почту
          </div>
        </div>
        <AppIcon name="dropdown_right" />
      </NuxtLink>

      <NuxtLink
        class="auth-form__method"
        to="#"
      >
        <div class="auth-form__method-inner">
          <div class="auth-form__method-title">
            Telegram
          </div>
          <div class="auth-form__method-text">
            Написать в поддержку — ответим быстро
          </div>
        </div>
        <AppIcon name="dropdown_right" />
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

  &__methods {
    display: flex;
    flex-direction: column;
    gap: $space-4;
  }

  &__method {
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    padding: $space-4 $space-2 $space-4 $space-4;
    border: 1px solid $color-neutral-200;
    border-radius: $radius-4;

    color: $color-neutral-400;
    text-decoration: none;

    &-inner {
      display: flex;
      flex-direction: column;
      gap: $space-05;
      align-items: flex-start;
    }

    &-title {
      @include text(medium, md);

      color: $color-neutral-950;
    }

    &-text {
      @include text(regular, sm);
    }
  }
}
</style>
