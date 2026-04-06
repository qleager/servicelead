<script lang="ts" setup>
import type { PieData } from '~/components/chart/Pie.vue'

const data = ref<PieData>([
  {
    label: 'Звонки',
    value: 6,
    color: {
      initial: '#83B0F6',
      emphasis: '#0861EE',
    },
  }, {
    label: 'Формы',
    value: 4,
    color: {
      initial: '#E2E9FC',
      emphasis: '#8289b1',
    },
  },
])
</script>

<template>
  <StatisticsWidgetBase
    class="statistics-widget-traffic"
    icon="pie_chart"
    title="Конверсии по трафику"
  >
    <template #value>
      <div class="statistics-widget-traffic__values">
        <div class="statistics-widget-traffic__metric">
          <div class="statistics-widget-traffic__head">
            <AppChip
              color="neutral"
              size="xs"
              standalone
            />
            <div class="statistics-widget-traffic__label">
              Формы
            </div>
          </div>
          <div class="statistics-widget-traffic__amount">
            <div class="statistics-widget-traffic__number">
              46
            </div>
            <div class="statistics-widget-traffic__unit">
              %
            </div>
          </div>
        </div>

        <div class="statistics-widget-traffic__metric">
          <div class="statistics-widget-traffic__head">
            <AppChip
              color="primary"
              size="xs"
              standalone
            />
            <div class="statistics-widget-traffic__label">
              Звонки
            </div>
          </div>
          <div class="statistics-widget-traffic__amount">
            <div class="statistics-widget-traffic__number">
              54
            </div>
            <div class="statistics-widget-traffic__unit">
              %
            </div>
          </div>
        </div>
      </div>
    </template>

    <template #chart>
      <ChartPie
        caption="100%"
        class="statistics-widget-traffic__chart"
        :data
        title="10"
      >
        <template #tooltip="{ item: scopedItem }">
          <div
            v-for="item in data"
            :key="item.value + item.label"
            :class="{
              'statistics-widget-traffic__chart-tooltip-item': true,
              'statistics-widget-traffic__chart-tooltip-item-active': item.label === scopedItem.label,
            }"
          >
            <div>{{ item.label }}</div>
            <div class="statistics-widget-traffic__chart-tooltip-divider" />
            <div>{{ item.value }}</div>
          </div>
        </template>
      </ChartPie>
    </template>
  </StatisticsWidgetBase>
</template>

<style lang="scss">
.statistics-widget-traffic {
  $this: &;

  &__values {
    display: flex;
    gap: $space-6;
  }

  &__head {
    display: flex;
    gap: $space-2;
    align-items: center;
  }

  &__label {
    @include text(normal, xs);

    text-transform: uppercase;
  }

  &__amount {
    display: flex;
    gap: $space-05;
    align-items: flex-end;
  }

  &__number {
    @include text(medium, 5xl);

    line-height: 1;
  }

  &__unit {
    @include text(medium, xl);

    margin-bottom: $space-05;
    line-height: 1.35;
  }

  &__chart {
    max-width: 117px;
    margin-left: auto;

    &-tooltip {
      &-item {
        display: flex;
        align-items: center;

        line-height: 1.33;
        color: $color-neutral-950;

        opacity: .33;

        @include text(medium, xs);

        &:not(:first-child) {
          margin-top: $space-2;
        }

        &-active {
          opacity: 1;
        }
      }

      &-divider {
        min-width: 60px;
        height: 10px;
        border-bottom: 1px dashed $color-neutral-200;
      }
    }
  }
}
</style>
