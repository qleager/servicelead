<script setup lang="ts">
/**
 * Пока у нас один layout – описываем его здесь
 * Если возникните проблема со smooth-scroll в web-app – рассмотреть position: fixed на #__nuxt
 */
</script>

<template>
  <div class="layout-default">
    <TheHeader class="layout-default__header" />
    <TheSidebar class="layout-default__sidebar" />
    <main class="layout-default__main">
      <NuxtPage />
    </main>
    <TheBar
      v-if="false"
      class="layout-default__bar"
    />
    <TheFooter class="layout-default__footer" />
  </div>
  <AppOverlayProvider />
</template>

<style lang="scss">
.layout-default {
  display: grid;
  grid-template:
    'sidebar header'
    'sidebar main'
    'sidebar footer' / 100%;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr auto;
  gap: $space-8 $space-10;

  min-height: 100dvh;
  padding-right: $space-6;

  &__header {
    position: sticky;
    top: 0;
    grid-area: header;
  }

  &__sidebar {
    position: sticky;
    top: 0;

    overflow: auto;
    grid-area: sidebar;

    height: 100dvh;

    &:not(:hover)::-webkit-scrollbar {
      visibility: hidden;;
    }
  }

  &__footer {
    grid-area: footer;
  }

  &__main {
    grid-area: main;
  }
}
</style>
