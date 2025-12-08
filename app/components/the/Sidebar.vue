<script lang="ts" setup>
const isCollapsed = ref<boolean>(false)

const classname = computed(() => [
  'sidebar',
  { 'sidebar--collapsed': isCollapsed.value },
])
</script>

<template>
  <aside :class="classname">
    <svg
      class="sidebar__logo"
      :width="isCollapsed ? 48 : 214"
      :height="48"
    >
      <use :xlink:href="isCollapsed ? '/image/logo_small_dark.svg' : '/image/logo_big_dark.svg'" />
    </svg>
    <NavigationMain :minimal="isCollapsed" />
    <div
      class="sidebar__button"
      @click="isCollapsed = !isCollapsed"
    >
      <AppIcon name="collapse" />
      <div v-if="!isCollapsed">
        Свернуть меню
      </div>
    </div>
  </aside>
</template>

<style lang="scss">
.sidebar {
  $this: &;

  @include text(semibold, md);

  display: flex;
  flex-direction: column;
  gap: $space-8;

  min-width: 200px;
  padding-top: $space-6;

  &__logo {
    width: 100%;
    padding: 0 $space-3 0 $space-6;
  }

  &__button {
    cursor: pointer;

    display: flex;
    gap: $space-4;
    align-items: center;
    justify-content: flex-start;

    max-width: 256px;
    padding: $space-3 0 $space-3 $space-10;

    color: $color-neutral-light-500;
  }

  &--collapsed {
    align-items: flex-start;
    min-width: unset;
    max-width: 100px;

    #{$this} {
      &__logo {
        padding-right: $space-6;
      }

      &__button {
        transform: rotate(180deg);
        padding-right: $space-8;
        padding-left: $space-4;
      }
    }
  }
}
</style>
