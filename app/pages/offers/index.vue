<script lang="ts" setup>
const route = useRoute()

// @ts-expect-error unknown unknown
const filter = reactive<unknown>({
  selectedTab: 1,
})

// REFACTORING: Упростить
onMounted(() => {
  if (typeof route.query.tab === 'string') {
    filter.selectedTab = Number(route.query.tab)
  }
})
</script>

<template>
  <div class="offers">
    <div class="offers__header">
      <div class="offers__title">
        Офферы
      </div>

      <AppInput
        class="offers__search"
        icon="search"
        placeholder="Начните поиск..."
        reset
        rounded
      />

      <OfferFilter
        v-model="filter"
        class="offers__filter"
        @update="() => {}"
      />
    </div>
    <div class="offers__main">
      <OfferList :size="11" />
    </div>
  </div>
</template>

<style lang="scss">
.offers {
  display: flex;
  flex-direction: column;
  gap: $space-9;

  &__header {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: $space-4 0;
    align-items: center;
  }

  &__title {
    @include text(bold, 5xl);
  }

  &__filter {
    grid-column: 1 / -1;
  }

  &__search {
    overflow: hidden;
    width: 48px;

    // реализация-исключение, хук, так как input не root элемент (выгляит хуево, это да)
    // фокус
    &:focus-within,
    // в input что то введнено
    &:not(:has(:placeholder-shown)) {
      width: 250px;
    }
  }
}
</style>
