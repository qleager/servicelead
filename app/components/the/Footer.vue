<script lang="ts" setup>
import type { IconProps } from '@/components/App/Icon.vue'

interface MenuItem {
  label?: string
  to: string
  icon: IconProps['name']
}

const menuItems: MenuItem[] = [
  { label: 'Приватный Telegram-канал', to: '#', icon: 'tg_line_24' },
  { label: '', to: '#', icon: 'vk' },
  { label: '', to: '#', icon: 'youtube' },
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

      color: $color-neutral-500;
      text-decoration: none;

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
