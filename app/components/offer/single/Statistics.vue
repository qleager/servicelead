<script lang="ts" setup>
</script>

<template>
  <OfferSinglePaneTemplate
    class="offer-single-statistics"
  >
    <template #content>
      <div class="offer-single-statistics__content">
        <StatisticsWidgetConversion
          class="offer-single-statistics__conversion"
          is-filter-visible
        />
        <StatisticsWidgetGeo class="offer-single-statistics__geo" />
        <StatisticsWidgetProductivity class="offer-single-statistics__productivity" />
        <StatisticsWidgetSummaryByOffer
          class="offer-single-statistics__summary"
          is-filter-visible
        />
        <StatisticsWidgetConversionByCities class="offer-single-statistics__cities" />
      </div>
    </template>
  </OfferSinglePaneTemplate>
</template>

<style lang="scss">
.offer-single-statistics {
  $this: &;

  &__content {
    display: grid;
    grid-template:
      'conversion geo     productivity'
      'summary    summary summary'
      'cities     cities  cities';
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 199px repeat(2, auto);
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
