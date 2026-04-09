<script setup lang="ts">
const hasSelectedFilters = computed(() => {
  return false
})

const resetFilters = () => {
  return
}
</script>

<template>
  <div class="thread-filter">
    <div class="thread-filter__main">
      <AppSelect
        color="neutral"
        :items="[1, 2]"
        multiple
        placeholder="Название потока"
        reset
        rounded
        size="xs"
      />
      <AppSelect
        color="neutral"
        :items="[1, 2]"
        multiple
        placeholder="Папка"
        reset
        rounded
        size="xs"
      />
      <AppSelect
        color="neutral"
        :items="[1, 2]"
        multiple
        placeholder="Проект"
        reset
        rounded
        size="xs"
      />
      <AppSelect
        color="neutral"
        :items="[1, 2]"
        multiple
        placeholder="Город"
        reset
        rounded
        size="xs"
      />
    </div>
    <AppButton
      v-if="hasSelectedFilters"
      color="neutral"
      size="xs"
      variant="link"
      @click="resetFilters"
    >
      Сбросить все
    </AppButton>
  </div>
</template>

<style lang="scss">
.thread-filter {
  display: flex;
  gap: $space-4;

  &__main {
    display: flex;
    gap: $space-2;
  }
}
</style>
