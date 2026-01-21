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
    <div class="offers__projects">
      Проекты
    </div>
    <div class="offers__header">
      <div class="offers__title">
        Офферы
      </div>
      <OffersFilter
        v-model="filter"
        class="offers__filter"
        @update="() => {}"
      />
    </div>
    <div class="offers__items">
      Сетка офферов
    </div>
  </div>
</template>

<style lang="scss">
.offers {
  display: flex;
  flex-direction: column;
  gap: $space-9;

  &__header {
    display: flex;
    gap: $space-10;
    align-items: start;
    width: 100%;
  }

  &__title {
    @include text(bold, 5xl);
  }

  &__filter {
    margin-top: $space-1;
  }
}
</style>
