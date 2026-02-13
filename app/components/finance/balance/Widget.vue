<script lang="ts" setup>
</script>

<template>
  <AppWidget
    icon="money"
    title="Деньги"
    @click:button="undefined"
  >
    <template #description>
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
