<script lang="ts" setup>
import AppFloater from '~/components/app/Floater.vue'
import AppSheet from '~/components/app/Sheet.vue'

interface Props {
  mode?: 'dropdown' | 'sheet'
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'dropdown',
})

const rootElement = computed(() => {
  switch (props.mode) {
    case 'dropdown':
      return AppFloater
    case 'sheet':
      return AppSheet
    default:
      return 'div'
  }
})

export type { Props as ManagerButtonProps }
</script>

<template>
  <Component
    :is="rootElement"
    class="manager-button"
  >
    <div class="manager-button__trigger">
      <NuxtImg
        :src="'/images/default-avatar.png'"
        class="manager-button__avatar"
      />
      <span class="manager-button__info">
        <span class="manager-button__name">Иванов Иван</span>
        <span class="manager-button__role">Ваш менеджер</span>
      </span>
    </div>
    <template #content>
      <AppWidget class="manager-button__wrapper">
        <div class="manager-button__profile">
          <NuxtImg
            :src="'/images/default-avatar.png'"
            class="manager-button__profile-avatar"
          />
          <div class="manager-button__profile-text">
            <div class="manager-button__profile-role">
              Ваш менеджер
            </div>
            <div class="manager-button__profile-name">
              Иванов Иван
            </div>
          </div>
          <div class="manager-button__profile-work-time">
            <AppIcon name="clock" />
            <div>Время работы: с 10 до 18</div>
          </div>
        </div>
        <div class="manager-button__links">
          <AppButton
            color="neutral"
            icon="tg_line_24"
          />
          <AppButton
            color="neutral"
            icon="phone_24"
          />
          <AppButton
            color="neutral"
            icon="mail_24"
          />
          <AppButton
            color="neutral"
            icon="question_24"
          />
        </div>
        <AppButton
          variant="nofilled"
          color="neutral"
          class="manager-button__feedback"
        >
          Проблема с менеджером?
        </AppButton>
      </AppWidget>
    </template>
  </Component>
</template>

<style lang="scss">
.manager-button {
  $this: &;

  &__trigger {
    cursor: pointer;

    display: flex;
    gap: $space-4;
    align-items: center;

    height: 56px;
    padding: $space-1 $space-6 $space-1 $space-1;
    border-radius: $space-12;

    &:hover {
      background: #fff;
    }

    &:active {
      background: $color-neutral-100;
    }

    &:disabled {
      pointer-events: none;
      cursor: default;
    }
  }

  &__avatar {
    overflow: hidden;

    width: 48px;
    height: 48px;
    border-radius: $space-18;

    object-fit: cover;

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

    color: $color-neutral-950;
  }

  &__name {
    @include text(SemiBold, md);
  }

  &__role {
    @include text(light, xs);
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: $space-4;
    align-items: center;

    padding: $space-6 $space-4;
  }

  &__profile {
    display: flex;
    flex-direction: column;
    gap: $space-2;
    align-items: center;

    &-avatar {
      width: 80px;
      height: 80px;
    }

    &-work-time {
      display: flex;
      gap: $space-1;
    }
  }

  &__links {
    display: flex;
    gap: $space-4;
  }
}
</style>
