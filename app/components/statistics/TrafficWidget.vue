<script lang="ts" setup>

</script>

<template>
  <AppWidget
    icon="traffic"
    title="Трафик"
    @click:button="undefined"
  >
    <template #content>
      <AppTag
        color="green"
        variant="soft"
      >
        StatisticsTrafficWidget.vue
      </AppTag>
    </template>
  </AppWidget>
</template>
