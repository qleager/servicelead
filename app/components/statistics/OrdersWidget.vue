<script lang="ts" setup>

</script>

<template>
  <AppWidget
    icon="money"
    title="Заявки"
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
      20.04.25 - 20.05.25
    </template>
    <template #content>
      <AppTag
        color="green"
        size="sm"
        variant="soft"
      >
        StatisticsOrdersWidget.vue
      </AppTag>
    </template>
  </AppWidget>
</template>
