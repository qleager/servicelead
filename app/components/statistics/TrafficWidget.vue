<script lang="ts" setup>

</script>

<template>
  <AppWidget
    icon="traffic"
    title="Трафик"
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
        color="green"
        variant="soft"
      >
        StatisticsTrafficWidget.vue
      </AppTag>
    </template>
  </AppWidget>
</template>
