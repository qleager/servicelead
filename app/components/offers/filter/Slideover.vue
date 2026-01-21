<script lang="ts" setup>
const isFiltersSlideoverVisible = ref(false)
</script>

<template>
  <div>
    <AppButton
      icon="filter"
      variant="lined"
      color="neutral"
      @click="isFiltersSlideoverVisible = true"
    >
      <!-- TODO: заменить на AppIndicator -->
      <AppTag
        v-if="activeFiltersCount > 0"
        color="white"
      >
        {{ activeFiltersCount }}
      </AppTag>
    </AppButton>
  </div>
  <AppSlideover
    v-model="isFiltersSlideoverVisible"
    title="Фильтры"
    icon="filter"
  >
    <template #footer>
      <AppButton
        variant="nofilled"
        color="neutral"
        @click="resetFilters"
      >
        Сбросить все
      </AppButton>
      <AppButton
        @click="applyFilters"
      >
        Применить
      </AppButton>
    </template>
  </AppSlideover>
</template>
