<script lang="ts" setup>

</script>

<template>
  <AppWidget
    icon="chart"
    title="Выручка по проектам"
  >
    <template #title>
      <AppButton
        color="neutral"
        icon="arrow_right"
        size="xs"
        variant="lined"
      />
    </template>
    <template #content>
      <AppTag
        color="purple"
        variant="soft"
      >
        FinanceIncomeWidget.vue
      </AppTag>
    </template>
  </AppWidget>
</template>
