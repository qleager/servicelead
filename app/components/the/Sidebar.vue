<script lang="ts" setup>
const isCollapsed = ref<boolean>(false)

const classname = computed(() => [
  'sidebar',
  { 'sidebar-collapsed': isCollapsed.value },
])

// TODO-1: Убираем small и big вариации
// Когда свернуто просто обрезаем буквы с помощтю object-fit
const logoIcon = computed(() =>
  isCollapsed.value ? '/images/logo-small-dark.svg' : '/images/logo-big-dark.svg',
)
</script>

<template>
  <aside :class="classname">
    <!-- TODO-5: отказываемся от оберки и меняем класс у NuxtImage на sidebar__logo  -->
    <!-- либо оставляем на оборачиавем в ссылку с href на главную -->
    <div class="sidebar__logo">
      <NuxtImg
        class="sidebar__logo-image"
        :src="logoIcon"
      />
    </div>
    <NavigationMain :minimal="isCollapsed" />
    <!-- // TODO-7: добавить hover и active как у понктов меню -->
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

  // TODO-3: перемещаем в порядке правил на то место где обычно текст
  @include text(semibold, md);

  display: flex;
  flex-direction: column;
  gap: $space-2;

  min-width: 200px;
  padding-right: $space-5;
  padding-bottom: $space-6;

  // TODO-3.1: получается сюда

  &__logo {
    position: sticky;
    top: 0;

    display: flex;
    justify-content: flex-start;

    min-width: 100%;

    // TODO-4: В новой sass теперь кажись необязательно задавать отрицание через интерполяцию – оставляем просто -$space-5
    // Если видим по ходу задач такое – то убираем
    margin-right: -#{$space-5};
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

    // TODO-6: просто color-neutral -- 500 цвет - это дефолт цвет палитры
    color: $color-neutral-500;

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

  // TODO-2: поднять в самый верх. Это состояния элмента, его всегда ставим перед его детьми
  &#{$collapsed} {
    align-items: flex-start;
    min-width: unset;
    max-width: 100px;
  }
}
</style>
