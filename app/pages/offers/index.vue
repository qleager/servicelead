<script lang="ts" setup>
const route = useRoute()

const offersFilter = reactive<any>({
  selectedTab: typeof route.query.tab === 'string' ? Number(route.query.tab) : 1,
})

const update = () => {}
</script>

<template>
  <div class="offers">
    <div class="offers__projects">
      Проекты
    </div>
    <div class="offers__header">
      <div class="offers__header-title">
        Офферы
      </div>
      <OffersFilter
        v-model="offersFilter"
        @update="update"
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
    align-items: center;
    width: 100%;

    &-title {
      @include text(bold, 5xl);
    }
  }
}
</style>
