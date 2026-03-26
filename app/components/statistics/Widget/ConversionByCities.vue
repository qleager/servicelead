<script lang="ts" setup>

</script>

<template>
  <AppWidget
    class="statistics-widget-conversion-by-cities"
    color="neutral"
    icon="rocket"
    title="Топ городов по конверсиям"
  >
    <template #trailingHeader>
      <AppButton
        color="neutral"
        size="sm"
        variant="link"
        @click="navigateTo('/summary')"
      >
        Подробнее
      </AppButton>
    </template>
    <template #content>
      table
    </template>
  </AppWidget>
</template>

<style lang="scss">
.statistics-widget-conversion {
  $this: &;
}
</style>
