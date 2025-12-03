<script lang="ts" setup>
// Это синяя кнопка с основными/частыми действиями в приложения
// Todo: вызвать оверлей еще

const items = [{}]
</script>

<template>
  <AppDropdown class="navigation-actions">
    <AppButton icon="plus"/>
    <template #content>
      <div>Создать то</div>
      <div>Создать сё</div>
    </template>
  </AppDropdown>
</template>

<style lang="scss">
.navigation-actions {}
</style>
