<script lang="ts" setup>
import type { IconProps } from '../App/Icon.vue'

interface MenuItem {
  label?: string
  to: string
  icon: IconProps['name']
}

const menuItems: MenuItem[] = [
  { label: 'Telegram', to: '#', icon: 'tg_line_24' },
  { label: 'VK', to: '#', icon: 'vk' },
  { label: 'YouTube', to: '#', icon: 'youtube' },
]
</script>

<template>
  <footer class="footer">
    <div class="footer__top">
      <div class="footer__info">
        <AppIcon
          class="footer__icon"
          name="new_widget"
          :size="40"
        />

        <div class="footer__text">
          <div class="footer__title">
            Не нашли нужный виджет?
          </div>
          <div class="footer__subtitle">
            Напишите нам и наша команда разработки обязательно добавит его!
          </div>
        </div>
      </div>

      <AppButton
        variant="filled"
        color="lighter"
        class="footer__ticket-btn"
      >
        Создать тикет
      </AppButton>
    </div>

    <div class="footer__menu">
      <span class="footer__menu-label">
        Приватный Telegram-канал
      </span>

      <a
        v-for="item in menuItems"
        :key="item.icon"
        :href="item.to"
        class="footer__menu-item"
        target="_blank"
        rel="noreferrer"
      >
        <AppIcon
          :name="item.icon"
          :size="24"
        />
      </a>
    </div>
  </footer>
</template>

<style lang="scss">
.footer {
  $this: &;

  display: flex;
  flex-direction: column;
  gap: $space-2;
  align-items: stretch;

  padding-top: $space-10;

  &__top {
    display: flex;
    justify-content: space-between;
  }

  &__info {
    display: flex;
    gap: $space-8;
  }

  &__icon {
    color: $color-neutral-light-300
  }

  &__text {
    display: flex;
    flex-direction: column;
    gap: $space-2;
  }

  &__title {
    color: $color-neutral-light-950;

    @include text(regular, xl);
  }

  &__subtitle {
    color: $color-neutral-light-500;

    @include text(regular, md);
  }

  &__ticket-btn {
    background: $color-neutral-light-100;
  }

  &__menu {
    display: flex;
    gap: $space-4;
    align-items: center;
    justify-content: flex-end;

    height: 88px;
    padding-right: 24px
  }

  &__menu-label {
    @include text(regular, sm);

    color: $color-neutral-light-500;
  }

  &__menu-item {
    display: inline-flex;
    color: $color-neutral-light-500;
  }
}
</style>
