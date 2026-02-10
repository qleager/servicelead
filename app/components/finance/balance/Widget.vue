<script lang="ts" setup>

</script>

<template>
  <AppWidget
    icon="money"
    title="Деньги"
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
      За период: 20.04.25 - 20.05.25
    </template>
    <template #content>
      <AppTag
        color="purple"
        variant="soft"
      >
        FinanceBalaneWidget.vue
      </AppTag>
    </template>
  </AppWidget>
</template>
