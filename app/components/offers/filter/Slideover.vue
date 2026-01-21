<script lang="ts" setup>
</script>

<template>
  <AppSlideover
    title="Фильтры"
    icon="filter"
  >
    <AppButton
      icon="filter"
      variant="lined"
      color="neutral"
    >
      <AppTag
        color="primary"
        size="sm"
      >
        5
      </AppTag>
    </AppButton>
    <template #footer>
      <AppButton
        variant="nofilled"
        color="neutral"
      >
        Сбросить все
      </AppButton>
      <AppButton>
        Применить
      </AppButton>
    </template>
  </AppSlideover>
</template>
