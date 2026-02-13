<script lang="ts" setup>

</script>

<template>
  <AppWidget
    description="20.04.25 - 20.05.25"
    icon="money"
    title="Заявки"
    @click:button="undefined"
  >
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
