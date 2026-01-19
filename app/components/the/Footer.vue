<script lang="ts" setup>
import type { IconProps } from '@/components/app/Icon.vue'

interface MenuItem {
  label?: string
  to: RouteTo<true>
  icon: IconProps['name']
}

const menuItems: MenuItem[] = [
  { label: 'Приватный Telegram-канал', to: '/dashboard', icon: 'tg_line_24' },
  { label: undefined, to: '/dashboard', icon: 'vk' },
  { label: undefined, to: '/dashboard', icon: 'youtube' },
]
</script>

<template>
  <footer class="footer">
    <div class="footer__menu">
      <NuxtLink
        v-for="(item, index) in menuItems"
        :key="index"
        :to="item.to"
        class="footer__menu-item"
        target="_blank"
        rel="noreferrer"
      >
        <span
          class="footer__menu-label"
        >
          {{ item.label }}
        </span>
        <AppIcon
          :name="item.icon"
          :size="24"
        />
      </NuxtLink>
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

  padding: 0 $space-5;

  &__menu {
    display: flex;
    gap: $space-4;
    align-items: center;
    justify-content: flex-end;

    height: 88px;
    padding-right: $space-6;

    &-item {
      display: inline-flex;
      gap: $space-4;
      align-items: center;

      // todo-1: без 500 - это дефолтный цвет палитры
      color: $color-neutral-500;
      text-decoration: none;

      // todo-2: transition из ds системы + :active c color-700
      &:hover {
        color: $color-neutral-600;
      }
    }

    &-label {
      @include text(regular, sm);

      &:empty {
        display: none;
      }
    }
  }
}
</style>
