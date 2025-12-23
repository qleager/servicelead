<script lang="ts" setup>
const isCollapsed = ref<boolean>(false)

const classname = computed(() => [
  'sidebar',
  { 'sidebar-collapsed': isCollapsed.value },
])

const logoIcon = computed(() =>
  isCollapsed.value ? '/images/logo-small-dark.svg' : '/images/logo-big-dark.svg',
)
</script>

<template>
  <aside :class="classname">
    <div class="sidebar__logo">
      <NuxtImg
        class="sidebar__logo-image"
        :src="logoIcon"
      />
    </div>
    <NavigationMain :minimal="isCollapsed" />
    <div
      class="sidebar__button"
      @click="isCollapsed = !isCollapsed"
    >
      <AppIcon name="collapse" />
      <div class="sidebar__button-text">
        Свернуть меню
      </div>
    </div>
  </aside>
</template>

<style lang="scss">
.sidebar {
  $this: &;
  $collapsed: & + '-collapsed';

  @include text(semibold, md);

  display: flex;
  flex-direction: column;
  gap: $space-8;

  min-width: 200px;
  padding-block: $space-6;

  &__logo {
    display: flex;
    justify-content: flex-start;

    width: 100%;
    height: 48px;
    padding-inline: $space-6;

    &-image {
      width: 100%;
      height: 100%;
    }
    #{$collapsed} & {
      width: 48px;
      margin-left: $space-6;
      padding: 0;
    }
  }

  &__button {
    cursor: pointer;

    display: flex;
    gap: $space-4;
    align-items: center;
    justify-content: flex-start;

    max-width: 256px;
    margin-top: auto;
    padding: $space-3 0 $space-3 $space-10;

    color: $color-neutral-light-500;

    #{$collapsed} & {
      transform: rotate(180deg);
      padding-right: $space-8;
      padding-left: $space-4;
    }

    &-text {
      #{$collapsed} & {
        display: none;
      }
    }
  }

  &#{$collapsed} {
    align-items: flex-start;
    min-width: unset;
    max-width: 100px;
  }
}
</style>
