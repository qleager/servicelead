<script lang="ts" setup>
definePageMeta({
  layout: 'auth',
})
</script>

<template>
  <div class="auth-recovery-email">
    <AppButton
      color="neutral"
      icon="arrow_left"
      size="sm"
      to="/auth"
      variant="link"
    >
      Вернуться к входу
    </AppButton>

    <div class="auth-recovery-email__header">
      <div class="auth-recovery-email__title">
        Сброс пароля
      </div>
      <div class="auth-recovery-email__subtitle">
        Укажите e-mail — отправим ссылку для сброса
      </div>
    </div>

    <AppLabel
      class="auth-recovery-email__field"
      title="E-mail"
    >
      <AppInput
        class="auth-recovery-email__input"
        name="email"
        placeholder="Введите e-mail"
        type="text"
      />
    </AppLabel>

    <AppButton
      class="auth-recovery-email__button"
      type="submit"
    >
      Отправить ссылку
    </AppButton>
  </div>
</template>

<style lang="scss">
.auth-recovery-email {
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
