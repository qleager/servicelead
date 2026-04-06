<script lang="ts" setup>
definePageMeta({
  layout: 'auth',
})
</script>

<template>
  <div class="auth-recovery">
    <AppButton
      color="neutral"
      icon="arrow_left"
      size="sm"
      to="/auth"
      variant="link"
    >
      Вернуться к входу
    </AppButton>

    <div class="auth-recovery__header">
      <div class="auth-recovery__title">
        Восстановление доступа
      </div>
      <div class="auth-recovery__subtitle">
        Выберите удобный способ
      </div>
    </div>

    <div class="auth-recovery__methods">
      <NuxtLink
        class="auth-recovery__method"
        to="/auth/recovery/email"
      >
        <div class="auth-recovery__method-inner">
          <div class="auth-recovery__method-title">
            Сбросить пароль по e-mail
          </div>
          <div class="auth-recovery__method-text">
            Отправим ссылку для сброса на почту
          </div>
        </div>
        <AppIcon name="dropdown_right" />
      </NuxtLink>

      <NuxtLink
        class="auth-recovery__method"
        to="#"
      >
        <div class="auth-recovery__method-inner">
          <div class="auth-recovery__method-title">
            Telegram
          </div>
          <div class="auth-recovery__method-text">
            Написать в поддержку — ответим быстро
          </div>
        </div>
        <AppIcon name="dropdown_right" />
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="scss">
.auth-recovery {
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

    transition: $blur-duration-md;

    &:hover {
      border-color: $color-neutral;
      transition: $hover-duration-md;
    }

    &:active {
      border-color: $color-neutral-600;
      transition: $active-duration-md;
    }

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
