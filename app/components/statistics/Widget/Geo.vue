<script lang="ts" setup>
</script>

<template>
  <StatisticsWidgetBase
    class="statistics-widget-geo"
    icon="geo_24"
    title="Охват гео"
  >
    <template #trailingHeader>
      <AppButton
        class="widget__button"
        color="neutral"
        icon="arrow_right"
        size="xs"
        variant="outline"
        @click="navigateTo('/geo')"
      />
    </template>
    <template #value>
      <div class="statistics-widget-geo__values">
        <div class="statistics-widget-geo__number">
          14
        </div>
      </div>
    </template>
    <template #chart>
      <NuxtImg
        class="statistics-widget-geo__icon"
        :src="'/images/map.svg'"
      />
    </template>
  </StatisticsWidgetBase>
</template>

<style lang="scss">
.statistics-widget-geo {
  $this: &;

  position: relative;
  overflow: hidden;

  &__values {
    display: flex;
    gap: $space-1;
    align-items: flex-end;
  }

  &__icon {
    position: absolute;
    bottom: $space-4;
    left: 30%;
    width: 286px;
  }

  &__number {
    @include text(medium, 5xl);

    line-height: 1;
  }
}
</style>
