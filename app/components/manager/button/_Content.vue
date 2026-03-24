<script lang="ts" setup>
</script>

<template>
  <div class="manager-button__content">
    <div class="manager-button__content-profile">
      <NuxtImg
        class="manager-button__content-profile-avatar"
        :src="'/images/default-avatar.png'"
      />
      <div class="manager-button__content-profile-text">
        <div class="manager-button__content-profile-role">
          Ваш менеджер
        </div>
        <div class="manager-button__content-profile-name">
          Иванов Иван
        </div>
      </div>
      <div class="manager-button__content-profile-work-time">
        <AppIcon
          class="manager-button__content-icon"
          name="clock"
          :size="16"
        />
        <div>Время работы: с 10 до 18</div>
      </div>
    </div>
    <div class="manager-button__content-links">
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
      class="manager-button__content-feedback"
      color="neutral"
      size="sm"
      variant="link"
    >
      Проблема с менеджером?
    </AppButton>
  </div>
</template>

<style lang="scss">
.manager-button__content {
  $this: &;

  display: flex;
  flex-direction: column;
  gap: $space-4;
  align-items: center;

  &-profile {
    display: flex;
    flex-direction: column;
    gap: $space-2;
    align-items: center;

    &-avatar {
      width: 80px;
      height: 80px;
    }

    &-text {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    &-role {
      @include text(regular, sm);

      color: $color-neutral;
    }

    &-name {
      @include text(regular, xl);
    }

    &-work-time {
      display: flex;
      gap: $space-1;
      align-items: flex-end;

      @include text(regular, xs);
    }
  }

  &-links {
    display: flex;
    gap: $space-4;
  }
}
</style>
