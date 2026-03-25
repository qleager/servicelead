<script lang="ts" setup>
</script>

<template>
  <AppWidget class="offer-single-statistics">
    <template #content>
      <div class="offer-single-statistics__grid">
        <StatisticsWidgetConversion class="offer-single-statistics__conversion" />
        <StatisticsWidgetGeo class="offer-single-statistics__geo" />
        <StatisticsWidgetProductivity class="offer-single-statistics__productivity" />
        <StatisticsWidgetSummary class="offer-single-statistics__summary" />
        <StatisticsWidgetConversionByCities class="offer-single-statistics__cities" />
      </div>
    </template>
  </AppWidget>
</template>

<style lang="scss">
.offer-single-statistics {
  $this: &;

  &__grid {
    display: grid;
    grid-template:
      'conversion geo     productivity'
      'summary    summary summary'
      'cities     cities  cities';
    grid-template-columns: repeat(3, 1fr);
    gap: $space-6 $space-4;
  }

  &__conversion {
    grid-area: conversion;
  }

  &__geo {
    grid-area: geo;
  }

  &__productivity {
    grid-area: productivity;
  }

  &__summary {
    grid-area: summary;
  }

  &__cities {
    grid-area: cities;
  }
}
</style>
