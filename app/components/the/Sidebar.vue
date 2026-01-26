<script lang="ts" setup>
const isCollapsed = ref<boolean>(false)

const classname = computed(() => [
  'sidebar',
  { 'sidebar-collapsed': isCollapsed.value },
])
</script>

<template>
  <aside :class="classname">
    <NuxtLink
      to="/dashboard"
      class="sidebar__logo"
    >
      <NuxtImg
        class="sidebar__logo-image"
        src="/images/logo-big-dark.svg"
      />
    </NuxtLink>
    <NavigationMain :minimal="isCollapsed" />
    <button
      type="button"
      class="sidebar__button"
      @click="isCollapsed = !isCollapsed"
    >
      <AppIcon name="collapse" />
      <div class="sidebar__button-text">
        Свернуть меню
      </div>
    </button>
  </aside>
</template>

<style lang="scss">
.sidebar {
  $this: &;
  $collapsed: $this + '-collapsed';

  display: flex;
  flex-direction: column;
  gap: $space-2;

  min-width: 200px;
  padding-right: $space-5;
  padding-bottom: $space-6;

  @include text(semibold, md);

  &#{$collapsed} {
    align-items: flex-start;
    min-width: unset;
    max-width: 100px;
  }

  &__logo {
    position: sticky;
    top: 0;

    display: flex;
    justify-content: flex-start;

    min-width: 100%;
    margin-right: -$space-5;
    padding: $space-6;
    padding-bottom: $space-5;

    background-color: rgba($color-neutral-50, 70%);
    backdrop-filter: blur(8px);

    // Gradient blur
    // &::after {
    //   pointer-events: none;
    //   content: '';

    //   position: absolute;
    //   inset: 0;

    //   opacity: 1;
    //   backdrop-filter: blur(25px);

    //   mask: linear-gradient($color-neutral-50 70%, transparent);
    // }

    &-image {
      z-index: 2;
      width: auto;
      height: 44px;

      #{$collapsed} & {
        width: 48px;
        object-fit: cover;
        object-position: left;
      }
    }
  }

  &__button {
    cursor: pointer;

    display: flex;
    gap: $space-6;
    align-items: center;
    justify-content: flex-start;

    max-width: 256px;
    margin-top: auto;
    padding: $space-3 0 $space-3 $space-10;

    @include text(semibold, md);

    color: $color-neutral;

    transition: color $blur-duration-sm;

    #{$collapsed} & {
      transform: rotate(180deg);
      padding-right: $space-10;
      padding-left: $space-4;
    }

    &:hover {
      color: inherit;
      transition-duration: $hover-duration-sm;
    }

    &:active {
      color: inherit;
      transition-duration: $active-duration-sm;
    }

    &-text {
      #{$collapsed} & {
        display: none;
      }
    }
  }
}
</style>
