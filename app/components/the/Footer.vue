<script lang="ts" setup>
import type { IconProps } from '@/components/app/Icon.vue'

interface MenuItem {
  icon: IconProps['name']
  label?: string
  to: RouteTo<true>
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
        class="footer__menu-item"
        rel="noreferrer"
        target="_blank"
        :to="item.to"
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

  padding: 0 $space-7 0 $space-5;

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

      color: $color-neutral;
      text-decoration: none;

      transition: $blur-duration-sm;

      &:hover {
        color: $color-neutral-600;
        transition: $hover-duration-sm;
      }

      &:active {
        color: $color-neutral-700;
        transition: $active-duration-sm;
      }
    }

    &-label {
      @include text(regular, sm);

      letter-spacing: -.03em;

      &:empty {
        display: none;
      }
    }
  }
}
</style>
