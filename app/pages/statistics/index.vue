<template>
  <div class="statistics">
    <div class="statistics__title">
      Статистика
    </div>

    <StatisticsFull />
  </div>
</template>

<style lang="scss">
.statistics {
  display: flex;
  flex-direction: column;
  gap: $space-4;

  &__title {
    @include text(bold, 5xl);
  }
}
</style>
