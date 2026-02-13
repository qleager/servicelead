<script lang="ts" setup>

</script>

<template>
  <AppWidget
    description="20.04.25 - 20.05.25"
    icon="money"
    title="Лиды"
    @click:button="undefined"
  >
    <template #content>
      <AppTag
        color="green"
        size="sm"
        variant="soft"
      >
        StatisticsLeadsWidget.vue
      </AppTag>
    </template>
  </AppWidget>
</template>
