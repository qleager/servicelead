<template>
  <div class="layout-default">
    <TheHeader class="layout-default__header" />
    <TheSidebar class="layout-default__sidebar" />
    <main class="layout-default__main">
      <slot />
    </main>
    <TheBar
      v-if="false"
      class="layout-default__bar"
    />
    <TheFooter class="layout-default__footer" />
  </div>
</template>

<style lang="scss">
.layout-default {
  display: grid;
  grid-template:
    'sidebar header'
    'sidebar main'
    'sidebar footer' / 100%;
  grid-template-columns: minmax(0, auto) minmax(0, 1fr);
  grid-template-rows: auto 1fr auto;
  row-gap: $space-9;

  min-height: 100dvh;

  &__header {
    position: sticky;
    z-index: 9;
    top: 0;
    grid-area: header;
  }

  &__sidebar {
    position: sticky;
    top: 0;

    overflow: auto;
    grid-area: sidebar;

    height: 100dvh;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__footer {
    grid-area: footer;
  }

  &__main {
    grid-area: main;
    padding-inline: $space-5 $space-7;
  }
}
</style>
