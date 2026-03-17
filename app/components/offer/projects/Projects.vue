<script setup lang="ts">
</script>

<template>
  <div class="offers-projects">
    <div class="offers-projects__info">
      <div class="offers-projects__info-title">
        Проекты
      </div>
      <div class="offers-projects__info-description">
        <div>Все наши офферы сгруппированы в&nbsp;проекты</div>
        <div>Ознакомтесь подробнее с&nbsp;возможностями дашборда проекта,&nbsp;изучите&nbsp;как </div>
      </div>
    </div>
    <div class="offers-projects__entries">
      <OfferProjectsEntry
        v-for="i in 3"
        :key="i"
      />
    </div>
  </div>
</template>

<style lang="scss">
.offers-projects {
  display: flex;
  gap: $space-4;
  justify-content: space-between;

  width: 100%;
  padding: $space-4;
  border-radius: $radius-6;

  background-color: white;

  &__info {
    display: flex;
    flex-direction: column;
    gap: $space-4;
    justify-content: space-between;

    padding: $space-4;

    &-title {
      @include text(semibold, 2xl);
    }

    &-description {
      display: flex;
      flex-direction: column;
      gap: $space-2;

      @include text(regular, sm);

      color: $color-neutral-400;
    }
  }

  &__entries {
    display: flex;
    gap: $space-4;
  }
}
</style>
