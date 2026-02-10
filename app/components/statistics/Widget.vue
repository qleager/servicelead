<script lang="ts" setup>
</script>

<template>
  <AppWidget
    class="statistics-widget"
    icon="statistic"
    title="Статистика"
  >
    <template #title>
      <AppButton
        color="neutral"
        icon="arrow_right"
        size="xs"
        variant="lined"
      />
    </template>
    <template #subtitle>
      <div class="statistics-widget__tabs">
        <AppButton
          v-for="item in 4"
          :key="item"
          class="statistics-widget__tabs-item"
          color="neutral"
          :rounded="false"
          size="sm"
        />
      </div>
    </template>
    <template #content>
      <AppTag
        color="green"
        variant="soft"
      >
        StatisticsWidget.vue
      </AppTag>
    </template>
  </AppWidget>
</template>

<style lang="scss">
.statistics-widget {
  overflow: auto;

  &__tabs {
    display: flex;
    gap: $space-2;
    padding-top: $space-4;

    &-item {
      width: 100%;
    }
  }
}
</style>
