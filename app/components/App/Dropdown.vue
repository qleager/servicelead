<script lang="ts" setup>
// TODO: слоты - обязательные
// Посомтреть, есть ли проверка на это
// должна быть в defineSlots вроде
interface Props {
  mode: 'click' | 'hover' // def click
}
</script>

<template>
  <!-- Подумать как тут правильно все обернуть, какие могут возникнуть ошибки -->
  <div :class="classname">
    <AppFloater :mode>
      <!-- тут слот в слоте будет вот – помешает это или нет, надо понять -->
      <div class="dropdown__slot dropdown__slot-default">
        <slot />
      </div>
      <template #content>
        <div class="dropdown__content">
          <slot name="content" />
        </div>
      </template>
    </AppFloater>
  </div>
</template>

<style lang="scss">
.dropdown {
  $this: &;
}
</style>
