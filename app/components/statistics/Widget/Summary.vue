<script lang="ts" setup>

</script>

<template>
  <AppWidget
    color="neutral"
    icon="statistic"
    title="Сводка"
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

<style></style>
