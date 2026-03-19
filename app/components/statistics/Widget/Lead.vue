<script lang="ts" setup>
</script>

<template>
  <StatisticsWidgetBase
    icon="rocket"
    title="Лиды"
    @click:button="navigateTo('/leads')"
  >
    <template #value>
      <div class="statistics-widget-lead__value">
        <div>
          60
        </div>
        <AppTag
          color="green"
          icon="arrow_up"
          trailing-icon
          variant="soft"
        >
          +7
        </AppTag>
      </div>
    </template>
    <template #chart>
      <div class="statistics-widget-lead__graphics">
        <AppTooltip
          v-for="i in 7"
          :key="i"
          class="statistics-widget-lead__graphics-column"
          :text="`19.03.2016 _ _ _ _ 5`"
        >
          <div />
        </AppTooltip>
      </div>
      <!-- <AppChartBar /> -->
    </template>
  </StatisticsWidgetBase>
</template>

<style lang="scss">
.statistics-widget-lead {
  &__value {
    display: flex;
    gap: $space-1;
    align-items: flex-end;
    line-height: 1 !important;

    @include text(medium, 5xl);
  }

  &__graphics {
    display: flex;
    gap: $space-1;
    align-items: flex-end;
    max-width: 210px;

    &-column {
      min-width: 20px;
      height: 120px;
      max-height: 120px;
      border-radius: $radius-2;

      line-height: 1;

      background-color: $color-neutral-150;

      transition: $hover-duration-sm;

      &:hover {
        background-color: $color-primary-500;
      }
    }
  }
}
</style>
