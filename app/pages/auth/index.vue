<script lang="ts" setup>
import { boolean, object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '~/components/app/Form.vue'

type Schema = InferType<typeof schema>

definePageMeta({
  layout: 'auth',
})

const { $api } = useNuxtApp()

const schema = object({
  email: string().email().required(),
  password: string()
    .min(8)
    .required(),
  rememberMe: boolean(),
})

const state = reactive({
  email: '',
  password: '',
  rememberMe: true,
})

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  const data = event.data

  try {
    await $api.auth.login({
      body: {
        ...data,
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

    <AppForm
      class="auth-login__form"
      :schema
      :state
      @submit="onSubmit"
    >
      <div class="auth-login__fields">
        <AppFormField
          class="auth-login__field"
          name="email"
          title="E-mail"
        >
          <AppInput
            v-model="state.email"
            autocomplete="username"
            class="auth-login__input"
            placeholder="Введите e-mail"
            type="text"
          />
        </AppFormField>

        <AppFormField
          class="auth-login__field"
          name="password"
          title="Пароль"
        >
          <AppInput
            v-model="state.password"
            autocomplete="current-password"
            class="auth-login__input"
            icon="eye"
            placeholder="Введите пароль"
            trailing-icon
            type="password"
          />
        </AppFormField>

        <div class="auth-login__actions">
          <AppCheckbox
            v-model="state.rememberMe"
            label="Запомнить"
            name="rememberMe"
          />

          <NuxtLink
            class="auth-login__link"
            to="/auth/recovery"
          >
            Забыли пароль?
          </NuxtLink>
        </div>

        <AppButton
          class="auth-login__button"
          type="submit"
        >
          Войти
        </AppButton>
      </div>
    </AppForm>

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
