<script lang="ts" setup>
interface Props {
  initHeight?: number // def 0 -- высота конетент
}

const classname = computed(() => ([
  'collapse',
  model.value ? 'expanded' : 'collapsed',
]))

const model = defineModel<boolean>() // раскрыто или свернуто -- def: false

// сonst fullHeight
</script>

<template>
  <div :class="classname">
    <!-- defautl-слот это триггре по которому происходит расскрытие/скрытие -->
    <div class="collapse__content">
      <!-- манипуляции с высотой только с .collapse__content -->
      <div class="collapse__slot collapse__slot-content">
        <slot name="content" />
      </div>
    </div>
    <!-- ℹ️ в каждый слот прокидываем model -->
  </div>
</template>

<style>
  /* анимация не требуется */
</style>
