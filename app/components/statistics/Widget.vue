<script lang="ts" setup>

</script>

<template>
  <AppWidget
    title="Статистика"
    icon="statistic"
    action
  >
    <div class="div1">
      <AppTable class="table1" />
    </div>
    <!-- StatisticsWidget.vue -->
  </AppWidget>
</template>

<style lang="scss">
.div1 {
  overflow: auto;
  height: 376px;
  margin-inline: -#{$space-2};
}
</style>
