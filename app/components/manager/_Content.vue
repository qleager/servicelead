<script lang="ts" setup>
import AppWidget from '~/components/app/Widget.vue'
import type { ManagerButtonProps } from './Button.vue'

interface Props {
  mode?: ManagerButtonProps['mode']
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'dropdown',
})

const rootElement = computed(() => {
  switch (props.mode) {
    case 'dropdown':
      return AppWidget
    case 'sheet':
      return 'div'
    default:
      return 'div'
  }
})

const classname = computed(() => [
  'manager-button-content',
  `manager-button-content-${props.mode}`,
])

export type { Props as ManagerButtonContentProps }
</script>

<template>
  <Component
    :is="rootElement"
    :class="classname"
  >
    <div class="manager-button-content__content">
      <div class="manager-button-content__profile">
        <NuxtImg
          :src="'/images/default-avatar.png'"
          class="manager-button-content__profile-avatar"
        />
        <div class="manager-button-content__profile-text">
          <div class="manager-button-content__profile-role">
            Ваш менеджер
          </div>
          <div class="manager-button-content__profile-name">
            Иванов Иван
          </div>
        </div>
        <div class="manager-button-content__profile-work-time">
          <AppIcon
            class="manager-button-content__icon"
            name="clock"
            :size="16"
          />
          <div>Время работы: с 10 до 18</div>
        </div>
      </div>
      <div class="manager-button-content__links">
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
        class="manager-button-content__feedback"
      >
        Проблема с менеджером?
      </AppButton>
    </div>
  </Component>
</template>

<style lang="scss">
.manager-button-content {
$this: &;
$dropdown: $this + '-dropdown';

&#{$dropdown} {
  box-shadow: $shadow-md;
}

// Без этого икона заливается. Надо чтобы диз изменил что-то в иконке?
&__icon {
  use {
    fill: none;
    stroke: currentcolor;
  }
}

  &__content {
    display: flex;
    flex-direction: column;
    gap: $space-4;
    align-items: center;
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

  &__links {
    display: flex;
    gap: $space-4;
  }
}
</style>
