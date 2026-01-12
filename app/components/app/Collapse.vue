<script lang="ts" setup>
interface Props {
  initHeight?: number // def 0 -- высота конетент
}

const classname = computed(() => ([
  'collapse',
  `collapse-${model.value ? 'expanded' : 'collapsed'}`,
]))

const model = defineModel<boolean>() // раскрыто или свернуто -- def: false

// сonst fullHeight
</script>

<template>
  <div :class="classname">
    <!-- defautl-слот это триггре по которому происходит расскрытие/скрытие -->
    <div
      class="collapse__slot collapse__slot-default"
      @click="model = !model"
    >
      <slot />
      <AppIcon
        name="dropdown"
        class="collapse__dropdown-icon"
      />
    </div>
    <div class="collapse__content">
      <!-- манипуляции с высотой только с .collapse__content -->
      <div class="collapse__slot collapse__slot-content">
        <slot name="content" />
      </div>
    </div>
    <!-- ℹ️ в каждый слот прокидываем model -->
  </div>
</template>

<style lang="scss">
.collapse {
  $this: &;
  $expanded: $this + '-expanded';
  $collapsed: $this + '-collapsed';

  &__slot {
    &-default {
      cursor: pointer;

      display: flex;
      gap: $space-4;
      justify-content: space-between;

      width: 100%;
    }
  }

  #{$expanded} {
    #{$this} {
      &__dropdown-icon {
        transform: rotate(180deg);
      }
    }
  }
}
</style>
