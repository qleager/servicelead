<script lang="ts" setup>
import type { IconProps } from '@/components/app/Icon.vue'

interface MenuItem {
  label?: string
  to: string
  icon: IconProps['name']
}

const menuItems: MenuItem[] = [
  { label: 'Приватный Telegram-канал', to: '#', icon: 'tg_line_24' },
  { label: undefined, to: '#', icon: 'vk' },
  { label: undefined, to: '#', icon: 'youtube' },
]
</script>

<template>
  <footer class="footer">
    <div class="footer__menu">
      <a
        v-for="(item, index) in menuItems"
        :key="index"
        :href="item.to"
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

      &:empty {
        display: none;
      }
    }
  }
}
</style>
